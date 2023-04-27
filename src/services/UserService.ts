import DatabaseError from "../exception/DatabaseError";
import { UserEntity } from "../interfaces/models/IUser";
import Log from "../middlewares/Log";
import User from "../models/UserModel";
import { validatePassword } from "../utils/password";
import BaseService from "./BaseService";

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
  
}

export default UserService