import {Router} from 'express'

import UserController from '../controllers/UserController'
import Validate from '../middlewares/Validate'
import createSchema from '../schemas/user/create'
import loginSchema from '../schemas/user/login'
import Route from '../utils/Route'
import Auth from '../middlewares/Auth'

const userRouter = Router()
const routePath = route => '/user' + route

userRouter.post(routePath('/create'), Route.setAdminMiddleWares([Validate.requireSchema(createSchema)]), UserController.create)
userRouter.post(routePath('/login'), [Validate.requireSchema(loginSchema)], UserController.login)
userRouter.get(routePath('/list'), Route.setAdminMiddleWares(), UserController.list)
userRouter.get(routePath('/validate'), [Auth.requireJwt], UserController.validate)

export default userRouter
