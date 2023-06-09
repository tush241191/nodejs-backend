import { BrandEntity } from "../interfaces/models/IBrand";
import { DeviceEntity } from "../interfaces/models/IDevice";
import BaseModel from "./BaseModel";

class Brand extends BaseModel implements BrandEntity {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  devices: DeviceEntity[];

  constructor(brand: BrandEntity) {
    super()
    this.assignEntity(brand)
  }

}

export default Brand
