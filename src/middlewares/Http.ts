import cors from 'cors'
import express, {Application} from 'express'
import useragent from 'express-useragent'
import requestIp from 'request-ip'

import Log from './Log'

class Http {
  public static mount(_express: Application): Application {
    Log.info('Booting the \'HTTP\' middleware...')

    _express.disable('x-powered-by')
    _express.enable('json spaces')
    _express.enable('strict routing')

    _express.use((req, res, next) => {
      express.json()(req, res, next)
    })
    _express.use(cors({
      exposedHeaders: [
        'Content-Type',
        'Content-Length',
        'Content-Disposition'
      ]
    }))

    _express.use(requestIp.mw())
    _express.use(useragent.express())

    return _express
  }
}

export default Http
