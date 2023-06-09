import { CategoryEntity } from "../interfaces/models/ICategory";
import { DeviceEntity } from "../interfaces/models/IDevice";
import BaseModel from "./BaseModel";

class Category extends BaseModel implements CategoryEntity {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  devices: DeviceEntity[];

   constructor(category: CategoryEntity) {
    super()
    this.assignEntity(category)
  }

}

export default Category
