import DatabaseError from "../exception/DatabaseError";
import { CartEntity } from "../interfaces/models/ICart";
import Log from "../middlewares/Log";
import Cart from "../models/CartModel";
import Device from "../models/DeviceModel";
import BaseService from "./BaseService";
import DeviceService from "./DeviceService";

const calculatePrice = (quantity: number, price: number) => {
  const totalPrice = price * quantity
  return Math.round(totalPrice * 100) / 100;
}

class CartService extends BaseService {
  static async create(userId, payload): Promise<Cart> {
    const { deviceId, quantity } = payload;
    const device = await DeviceService.get(deviceId)
    const deviceResponse = new Device(device)
    const { quantity: availableQuantity, price } = deviceResponse;

    if (quantity > availableQuantity) {
      throw new DatabaseError('Out of stock')
    }
    
    const roundedPrice = calculatePrice(quantity, price)

    const cartPayload = {
      userId: userId,
      deviceId: deviceId,
      quantity: quantity,
      price: roundedPrice,
      isActive: true
    }
    
    try {
      const cart = await Cart.service.create({
        data: cartPayload,
        include: {
          user: true,
          device: true
        }
      })

      return new Cart(cart)
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  static async get(id): Promise<Cart|null> {
    try {
      const cart = await Cart.service.findUniqueOrThrow({
        where: {id},
        include: {
          user: true,
          device: true
        }
      })

      return new Cart(cart)
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  static async list(userId, showAll = false): Promise<Cart[]> {
    try {
      const cartList = await Cart.service.findMany({
        where: {
          ...!showAll && {
            userId: userId,
            isActive: true,
            deletedAt: null
          }
        },
        orderBy: {createdAt: 'desc'},
        include: {
          user: true,
          device: true
        }
      })

      return cartList.map((cart: CartEntity) => new Cart(cart))
    } catch (err) {
      Log.error(`Error :: ${err}'`)
    }
  }

  static async update(id: string, payload): Promise<Cart> {
    const {quantity} = payload;
    const cart = await CartService.get(id)
    const cartResponse = new Cart(cart)

    const device = await DeviceService.get(cartResponse.device.id)
    const deviceResponse = new Device(device)
    const { quantity: availableQuantity, price } = deviceResponse;

    if (quantity > availableQuantity) {
      throw new DatabaseError('Out of stock')
    }
    
    const roundedPrice = calculatePrice(quantity, price)

    const cartPayload = {
      quantity: quantity,
      price: roundedPrice
    }

    try {
      const cart = await Cart.service.update({
        where: {id},
        data: cartPayload,
        include: {
          user: true,
          device: true
        }
      })

      return new Cart(cart)
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

  static async delete(id): Promise<Cart> {
    try {
      const cart = await super.delete({
        service: Cart.service,
        id: id
      })

      return new Cart(cart)
    } catch (err) {
      throw new DatabaseError(err)
    }
  }

}

export default CartService
