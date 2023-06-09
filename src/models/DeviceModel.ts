import { Prisma } from "@prisma/client";
import { BrandEntity } from "../interfaces/models/IBrand";
import { CategoryEntity } from "../interfaces/models/ICategory";
import { DeviceEntity } from "../interfaces/models/IDevice";
import Database from "../providers/Database";
import BaseModel from "./BaseModel";

class Device extends BaseModel implements DeviceEntity {
  public static readonly service = Database.client.device
  public static readonly tableName = Prisma.ModelName.Device
  
  id: string;
  name: string;
  categoryId: string;
  brandId: string;
  description: string;
  quantity: number;
  price: number;
  category: CategoryEntity;
  brand: BrandEntity;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(device: DeviceEntity) {
    super()
    this.assignEntity(device)
  }
}

export default Device
