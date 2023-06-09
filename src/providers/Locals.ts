import * as dotenv from 'dotenv'

class Locals {
  public static config() {
    const nodeEnv = process.env.NODE_ENV || 'production'

    dotenv.config({path: `.env.${nodeEnv}`})

    const jwtSecretUser = process.env.JWT_TOKEN_KEY
    const port = process.env.PORT || 80
    const apiPrefix = 'v1'

    return { jwtSecretUser, port, apiPrefix }
  }
}

export default Locals
