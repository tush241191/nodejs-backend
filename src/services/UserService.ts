import { randomBytes } from "crypto";
import DatabaseError from "../exception/DatabaseError";
import { UserCreateData, UserEntity, UserRoles } from "../interfaces/models/IUser";
import Log from "../middlewares/Log";
import User from "../models/UserModel";
import { generatePasswordHash, validatePassword } from "../utils/password";
import BaseService from "./BaseService";

const generateRandomToken = () => {
  return randomBytes(48).toString('base64').replace(/[+/]/g, '.')
}

class UserService extends BaseService {
  static async list(): Promise<User[]> {
    try {
      const userList = await super.list({
        service: User.service
      })

      return userList.map((user: UserEntity) => new User(user))
    } catch (err) {
      Log.error(`Error :: ${err}'`)
    }

    return []; // Default return value
  }

  static async get(id: string): Promise<User> {
    try {
      const user = await User.service.findUniqueOrThrow({
        where: {id}
      })

      return new User(user)
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  static async authenticateWithPassword(username, password): Promise<User|null> {
    try {
      const user = await User.service.findUnique({
        where: {email: username},
        select: {
          id: true,
          password: true,
          deletedAt: true,
          isActive: true,
          role: true
        }
      })

      if (!user) return null

      const isPasswordValid = await validatePassword(password, user.password)
      const isUserActive = user.isActive && user.deletedAt === null

      if (!isPasswordValid || !isUserActive) return null

      user.lastLoginAt = new Date()

      const updatedUser = await User.service.update({
        where: {id: user.id},
        data: {lastLoginAt: user.lastLoginAt}
      })

      return new User(updatedUser)
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  static async create(payload: UserCreateData, password: string): Promise<User> {
    if (payload.role === UserRoles.ADMIN && (payload.clientId || payload.producerId)) {
      throw new Error('Admin users cannot be linked to clients/producers')
    }

    const userPasswordHash = await generatePasswordHash(password)

    const buildUserData = () => {
      const userData = {
        email: payload.email,
        role: payload.role,
        isActive: payload.isActive,
        firstName: payload.firstName,
        lastName: payload.lastName
      }

      return userData
    }

    try {
      const data = {
        ...buildUserData(),
        ...{
          password: userPasswordHash,
          refreshId: generateRandomToken()
        }
      }

      const user = await User.service.create({
        data: data
      })

      delete user.refreshId

      return new User(user)
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  static async setPassword(user, password) {
    user.password = await generatePasswordHash(password); // eslint-disable-line

    try {
      if (user.id) {
        return User.service.update({
          where: {id: user.id},
          data: {password: user.password}
        })
      }

      return user
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  static async regenerateRefreshId(user: User) {
    try {
      const updatedUser = await User.service.update({
        where: {id: user.id},
        data: {
          refreshId: generateRandomToken()
        }
      })

      return new User(updatedUser)
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  static async regenerateToken(user) {
    user.token = generateRandomToken(); // eslint-disable-line

    try {
      if (user.id) {
        return User.service.update({
          where: {id: user.id},
          data: {password: user.password}
        })
      }

      return user
    } catch (err) {
      throw new DatabaseError(err)
    }
  }
  
}

export default UserService
