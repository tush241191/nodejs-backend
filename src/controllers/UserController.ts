import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import UserService from "../services/UserService"
import UserResponse from "./responses/UserResponse"
import ResourceHandler from "../exception/ResourceHandler"
import AuthHandler from "../exception/AuthHandler"
import JsonWebToken from "../utils/JsonWebToken"
import { JsonWebTokenTypes } from "../interfaces/utils/jwt"
import DatabaseError from "../exception/DatabaseError"
import MyRequest from "../@types/global"
 
class UserController {

  public static async login(req: Request, res: Response) {
    try {
      const {username, password, authOrigin} = req.body
      const user = await UserService.authenticateWithPassword(username, password)

      if(!user) {
        return AuthHandler.notAuthenticated(res, 'Authentication failed')
      }

      user.evaluateAuthOrigin(authOrigin)

      const userResponse = new UserResponse(user)
      return res.json({
        user: userResponse.build(),
        token: new JsonWebToken(JsonWebTokenTypes.USER).generate(user)
      })
    } catch (err) {
      return AuthHandler.notAuthenticated(res, err.message)
    }
  }

  public static async list(req: Request, res: Response) {
    try {
      const userList = await UserService.list()
      const response = userList.map(user => {
        const resp = new UserResponse(user)
        return resp.build()
      })
      res.json(response)
    } catch (err) {
      const errPayload = {error: 'Failed to fetch users list', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }

  public static async create(req: Request, res: Response) {
    const reqData = req.body

    try {
      const newUser = await UserService.create(reqData, reqData.password)
      const userResponse = new UserResponse(newUser)

      res.json({
        user: userResponse.build()
      })
    } catch (err) {
      if (err instanceof DatabaseError) {
        return err.handle(res)
      }

      const errPayload = {error: 'Failed to create a user', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }

  public static async validate(req: MyRequest, res: Response) {
    const userResponse = new UserResponse(req.user)
    return res.json({
      user: userResponse.build()
    })
  }

}

export default UserController
