import { DeviceEntity } from "./IDevice";
import { UserEntity } from "./IUser";

export interface CartEntity {
  id: string;
  user: UserEntity;
  device: DeviceEntity;
  quantity: number;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}