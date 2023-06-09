import { Request, Response } from "express"
import ResourceHandler from "../exception/ResourceHandler"
import DeviceService from "../services/DeviceService"
import DeviceResponse from "./responses/DeviceResponse"
import DatabaseError from "../exception/DatabaseError"

class DeviceController {
  public static async list(req: Request, res: Response) {
    try {
      const deviceList = await DeviceService.list()
      const response = deviceList.map(device => {
        const resp = new DeviceResponse(device)
        return resp.build()
      })
      res.json(response)
    } catch (err) {
      const errPayload = {error: 'Failed to fetch device list', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }

  public static async read(req: Request, res: Response) {
    try {
      const device = await DeviceService.get(req.params.id)

      const deviceResponse = new DeviceResponse(device)
      res.json(deviceResponse.build())
    } catch (err) {
      if (err instanceof DatabaseError) {
        return err.handle(res)
      }

      const errPayload = {error: 'Failed to fetch device', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }
}

export default DeviceController
