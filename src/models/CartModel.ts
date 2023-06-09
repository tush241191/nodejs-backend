import { Prisma } from "@prisma/client";
import { CartEntity } from "../interfaces/models/ICart";
import { DeviceEntity } from "../interfaces/models/IDevice";
import { UserEntity } from "../interfaces/models/IUser";
import Database from "../providers/Database";
import BaseModel from "./BaseModel";

class Cart extends BaseModel {
  public static readonly service = Database.client.cart
  public static readonly tableName = Prisma.ModelName.Cart

  id: string;
  user: UserEntity;
  device: DeviceEntity;
  quantity: number;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(cart: CartEntity) {
    super()
    this.assignEntity(cart)
  }
}

export default Cart
