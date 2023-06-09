import {Details} from 'express-useragent'

import User from '../models/UserModel'

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
      useragent?: Details | undefined;
      clientIp?: string | undefined;
    }
  }
}
