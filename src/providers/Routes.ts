import { Application } from "express"
import Log from "../middlewares/Log"
import Locals from "./Locals"
import userRouter from "../routes/UserRouter"

class Routes {
  private getPrefixRootRoute(): string {
    const apiPrefix = Locals.config().apiPrefix
    return `/${apiPrefix}`
  }
  
  public mountUser(_express: Application): Application {
    Log.info('Routes :: Mounting User Routes...')

    return _express.use(this.getPrefixRootRoute(), userRouter)
  }
}

export default new Routes