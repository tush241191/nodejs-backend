import {UserAuthOrigins} from '../../interfaces/models/IUser'

export default {
  type: 'object',
  properties: {
    username: {type: 'string', format: 'email'},
    password: {type: 'string'},
    authOrigin: {type: 'string', enum: Object.values(UserAuthOrigins)}
  },
  required: ['username', 'password', 'authOrigin']
}
