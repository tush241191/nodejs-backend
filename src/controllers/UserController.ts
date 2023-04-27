import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import UserService from "../services/UserService"
import UserResponse from "./responses/UserResponse"
import ResourceHandler from "../exception/ResourceHandler"
import AuthHandler from "../exception/AuthHandler"
import JsonWebToken from "../utils/JsonWebToken"
import { JsonWebTokenTypes } from "../interfaces/utils/jwt"
 
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

}

export default UserController