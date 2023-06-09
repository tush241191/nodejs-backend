import DatabaseError from "../exception/DatabaseError";
import { DeviceEntity } from "../interfaces/models/IDevice";
import Log from "../middlewares/Log";
import Device from "../models/DeviceModel";
import BaseService from "./BaseService";

class DeviceService extends BaseService {
  static async list(): Promise<Device[]> {
    try {
      const deviceList = await super.list({
        service: Device.service,
        include: {
          category: true,
          brand: true,
        }
      })

      return deviceList.map((device: DeviceEntity) => new Device(device))
    } catch (err) {
      Log.error(`Error :: ${err}'`)
    }

    return []; // Default return value
  }

  static async get(id: string): Promise<Device> {
    try {
      const device = await Device.service.findUniqueOrThrow({
        where: {id},
        include: {
          category: true,
          brand: true,
        }
      })

      return new Device(device)
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

}

export default DeviceService
