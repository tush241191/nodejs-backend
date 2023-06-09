import jsonwebtoken from 'jsonwebtoken'

import {UserEntity} from '../interfaces/models/IUser'
import {
  JsonWebTokenTypes, JwtPayloadTypes,
  UserJwtPayload
} from '../interfaces/utils/jwt'
import Locals from '../providers/Locals'

class JsonWebToken {
  private readonly type: JsonWebTokenTypes
  private readonly secret: string
  private readonly expirationTime: string

  public constructor(type: JsonWebTokenTypes) {
    this.type = type
    this.secret = this.setTypeSecret()
    this.expirationTime = this.setExpirationTime()
  }

  public generate(payload: JwtPayloadTypes): string {
    const jwtPayload = this.buildTypePayload(payload)
    const jwtOptions = {expiresIn: this.expirationTime}

    return jsonwebtoken.sign(jwtPayload, this.secret, jwtOptions)
  }

  private buildTypePayload(payload) {
    const typePayloads = {
      [JsonWebTokenTypes.USER]: {
        userId: payload.id,
        userEmail: payload.email,
        refreshId: payload.refreshId
      } as UserJwtPayload
    }

    this.validateTypeValDefinition(typePayloads)

    return typePayloads[this.type]
  }

  private setTypeSecret(): string {
    const typeSecrets = {
      [JsonWebTokenTypes.USER]: Locals.config().jwtSecretUser
    }

    this.validateTypeValDefinition(typeSecrets)

    return typeSecrets[this.type]
  }

  private setExpirationTime(): string {
    const typeExpTimes = {
      [JsonWebTokenTypes.USER]: '1h'
    }

    this.validateTypeValDefinition(typeExpTimes)

    return typeExpTimes[this.type]
  }

  private validateTypeValDefinition(values) {
    if(!(this.type in values)) {
      throw new Error('Type value has not been defined')
    }
  }

  public verify(token: string) {
    return jsonwebtoken.verify(token, this.secret)
  }

  public static validateUserPayload(jwt: UserJwtPayload, user: UserEntity) {
    if (jwt.refreshId !== user.refreshId) {
      throw new Error('Refresh ID is invalid or expired')
    }
  }
}

export default JsonWebToken
