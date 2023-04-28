import {Router} from 'express'

import CartController from '../controllers/CartController'
import createCartSchema from '../schemas/cart/create'
import Route from '../utils/Route'
import Validate from '../middlewares/Validate'

const cartRouter = Router()
const routePath = route => '/cart' + route

cartRouter.post(routePath('/create/'), Route.setClientMiddleWares(),[Validate.requireSchema(createCartSchema)], CartController.create)

export default cartRouter
