import Log from "../middlewares/Log"
import Express from "./Express"
import Locals from "./Locals"

class App {
  public loadServer (): void {
    Log.info(`Listening on 0.0.0.0:${Locals.config().port}`)

    Express.init()
  }
}

export default new App
