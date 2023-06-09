import {UserRoles} from '../../interfaces/models/IUser'

export default {
  type: 'object',
  required: [
    'email',
    'password',
    'role',
    'isActive',
    'firstName',
    'lastName'
  ],
  additionalProperties: false,
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string', minLength: 8, maxLength: 128},
    role: {type: 'string', enum: Object.values(UserRoles)},
    isActive: {type: 'boolean'},
    firstName: {type: 'string'},
    lastName: {type: 'string'}
  }
}
