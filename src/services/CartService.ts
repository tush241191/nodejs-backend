import DatabaseError from "../exception/DatabaseError";
import Cart from "../models/CartModel";
import BaseService from "./BaseService";

class CartService extends BaseService {
  static async create(payload): Promise<Cart> {
    try {
      const cart = await Cart.service.create({
        data: payload,
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
}

export default CartService
