import concat from 'lodash/concat'

import Auth from '../middlewares/Auth'

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

}

export default Route
