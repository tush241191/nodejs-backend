import User from '../../models/UserModel'

export type JwtPayloadTypes = User

interface JwtPayload {
  iat?: number;
  exp?: number;
}

export interface UserJwtPayload extends JwtPayload{
  userId: string;
  userEmail: string;
  refreshId: string;
}

export enum JsonWebTokenTypes {
  USER = 'user'
}
