import {Router} from 'express'

import CartController from '../controllers/CartController'
import createCartSchema from '../schemas/cart/create'
import updateCartSchema from '../schemas/cart/update'
import Route from '../utils/Route'
import Validate from '../middlewares/Validate'
import { UserRoles } from '../interfaces/models/IUser'

const cartRouter = Router()
const routePath = route => '/cart' + route

cartRouter.post(routePath('/create'), Route.setClientMiddleWares(), [Validate.requireSchema(createCartSchema)], CartController.create)
cartRouter.get(routePath('/list'), Route.setMultiRoleMiddlewares([UserRoles.ADMIN, UserRoles.CLIENT]), CartController.list)
cartRouter.patch(routePath('/:id'), Route.setClientMiddleWares(), [Validate.requireSchema(updateCartSchema)], CartController.update)
cartRouter.delete(routePath('/:id'), Route.setClientMiddleWares(), CartController.delete)

export default cartRouter
