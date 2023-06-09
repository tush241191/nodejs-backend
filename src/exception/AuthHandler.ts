import Log from '../middlewares/Log'

class AuthHandler {
  public static notAuthenticated(res, message): string {
    Log.error('User not authenticated')

    return res
      .status(401)
      .send({error: message})
  }

  public static forbidden(res, message): string {
    Log.error('User does not have privileges to perform the action')

    return res
      .status(403)
      .send({error: message})
  }

  public static missingEntity(res, message): string {
    Log.error('Unprocessable Entity in the Auth request')

    return res
      .status(422)
      .send({error: message})
  }
}

export default AuthHandler
