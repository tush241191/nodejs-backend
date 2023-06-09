import { Prisma } from "@prisma/client";
import { UserAuthOrigins, UserEntity, UserRoles } from "../interfaces/models/IUser";
import BaseModel from "./BaseModel";
import Database from "../providers/Database";
import { includes } from "lodash";

class User extends BaseModel implements UserEntity {
  public static readonly service = Database.client.user
  public static readonly tableName = Prisma.ModelName.User

  public id: string = ''
  public email: string = ''
  public password: string = ''
  public refreshId: string = ''
  public firstName: string = ''
  public lastName: string = ''
  public role: UserRoles = UserRoles.CLIENT
  public isActive: boolean = true
  public lastLoginAt?: Date | null
  public createdAt: Date = new Date()
  public updatedAt: Date = new Date()
  public deletedAt: Date | null = null


  constructor(user: UserEntity) {
    super()
    this.assignEntity(user)
  }

  public isAdmin(): boolean {
    return this.role === UserRoles.ADMIN
  }

  public isClient(): boolean {
    return this.role === UserRoles.CLIENT
  }

  public evaluateAuthOrigin(authOrigin: string): string {
    const originAllowanceMap = {
      [UserAuthOrigins.APP]: [UserRoles.CLIENT],
      [UserAuthOrigins.ADMIN]: [UserRoles.ADMIN]
    }

    if(!includes(originAllowanceMap[authOrigin], this.role)) {
      throw new Error('User role does not meet the criteria of the auth origin')
    }

    return authOrigin
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

}

export default User