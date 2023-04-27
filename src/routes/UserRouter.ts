import {Router} from 'express'

import UserController from '../controllers/UserController'
import Validate from '../middlewares/Validate'
import loginSchema from '../schemas/user/login'

const userRouter = Router()
const routePath = route => '/user' + route

userRouter.post(routePath('/login'), [Validate.requireSchema(loginSchema)], UserController.login)
userRouter.get(routePath('/list'), UserController.list)

export default userRouter
