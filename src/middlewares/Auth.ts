import {Request} from 'express'

import AuthHandler from '../exception/AuthHandler'
import {JsonWebTokenTypes} from '../interfaces/utils/jwt'

import JsonWebToken from '../utils/JsonWebToken'
import UserService from '../services/UserService'
import MyRequest from '../@types/global'

class Auth {
  public static async requireJwt (req: MyRequest, res, next) {
    const authHeader = req.get('Authorization')

    if (!authHeader) {
      return AuthHandler.notAuthenticated(res, 'A token is required for authentication')
    }

    try {
      const token = authHeader.substring(7, authHeader.length)
      const jwt = new JsonWebToken(JsonWebTokenTypes.USER).verify(token)

      req.user = await UserService.get(jwt.userId)

      JsonWebToken.validateUserPayload(jwt, req.user)
    } catch (err) {
      return AuthHandler.notAuthenticated(res, 'Invalid token')
    }

    return next()
  }

  public static reqParamsSet(params) {
    return (req, res, next) => {

      params.forEach(param => {
        const reqParam = req.query[param]
        if(!reqParam) {
          return AuthHandler.missingEntity(res, `Query param "${param}" missing from the request`)
        }
      })

      next()
    }
  }

  public static requireClientRole (req: MyRequest, res, next) {
    try {
      if (!req.user.isClient()) {
        throw new Error('User must be of type client to perform the operation')
      }
    } catch (err) {
      return AuthHandler.forbidden(res, err.message)
    }

    return next()
  }

  public static requireAdminRole (req: MyRequest, res, next) {
    try {
      if (!(req.user.isAdmin())) {
        throw new Error('User lacks permissions to perform the operation')
      }
    } catch (err) {
      return AuthHandler.forbidden(res, err.message)
    }

    return next()
  }

  public static requireClientOrAdminRole (req: MyRequest, res, next) {
    try {
      if (!(req.user.isClient() || req.user.isAdmin())) {
        throw new Error('User must be of type client or admin to perform the operation')
      }

    } catch (err) {
      return AuthHandler.forbidden(res, err.message)
    }

    return next()
  }

}

export default Auth
