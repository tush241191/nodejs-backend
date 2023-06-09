import * as express from 'express'
import Locals from './Locals'
import Log from '../middlewares/Log'
import Routes from './Routes'
import Kernel from '../middlewares/Kernel'

class Express {
  /**
  * Create the express object
  */
  public express: express.Application

  /**
  * Initializes the express server
  */
  constructor () {
    this.express = express.default()

    this.mountMiddlewares()
    this.mountRoutes()
  }

  /**
  * Mounts all the defined middlewares
  */
  private mountMiddlewares (): void {
    this.express = Kernel.init(this.express)
  }
  
  /**
   * Mounts all the defined routes
   */
  private mountRoutes (): void {
    this.express = Routes.mountUser(this.express)
    this.express = Routes.mountDevice(this.express)
    this.express = Routes.mountCart(this.express)
  }

  /**
  * Starts the express server
  */
  public init () {
    const port = Locals.config().port

    // @TODO
    //this.express = ExceptionHandler.notFoundHandler(this.express)

    this.express.listen(port, () => {
      return Log.info(`Server :: Running @ 'http://localhost:${port}'`)
    }).on('error', _error => {
      return Log.error(`Error :: ${_error.message}'`)
    })
  }
}

export default new Express()
