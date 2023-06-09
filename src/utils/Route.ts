import concat from 'lodash/concat'

import Auth from '../middlewares/Auth'
import { UserRoles } from '../interfaces/models/IUser'
import { isEqual, sortBy } from 'lodash'

class Route {
  
  public static setAdminMiddleWares(additionalMiddlewares= []) {
    const defaultAdminMiddlewares = [
      Auth.requireJwt,
      Auth.requireAdminRole
    ]

    return concat(defaultAdminMiddlewares, additionalMiddlewares)
  }

  public static setClientMiddleWares(additionalMiddlewares = []) {
    const defaultClientMiddlewares = [
      Auth.requireJwt,
      Auth.requireClientRole
    ]

    return concat(defaultClientMiddlewares, additionalMiddlewares)
  }

  public static setMultiRoleMiddlewares(roles: UserRoles[], additionalMiddlewares= []) {
    const getRoleMiddlewares = () => {
      const sortedRoles = sortBy(roles)

      const roleMiddleware = [Auth.requireJwt]

      if(isEqual(sortedRoles, sortBy([UserRoles.ADMIN, UserRoles.CLIENT]))) {
        roleMiddleware.push(Auth.requireClientOrAdminRole)
      } else {
        throw new Error('MultiRoleMiddleware does not have an appropriate match for the provided roles array')
      }

      return roleMiddleware
    }

    return concat(getRoleMiddlewares(), additionalMiddlewares)
  }

}

export default Route
