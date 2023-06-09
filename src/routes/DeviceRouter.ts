import {Router} from 'express'

import DeviceController from '../controllers/DeviceController'

const deviceRouter = Router()
const routePath = route => '/device' + route

deviceRouter.get(routePath('/list'), DeviceController.list)
deviceRouter.get(routePath('/:id'), DeviceController.read)

export default deviceRouter
