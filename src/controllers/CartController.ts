import { Request, Response } from "express";
import MyRequest from "global";
import DeviceService from "../services/DeviceService";
import Device from "../models/DeviceModel";
import CartService from "../services/CartService";
import CartResponse from "./responses/CartResponse";
import DatabaseError from "../exception/DatabaseError";
import ResourceHandler from "../exception/ResourceHandler";

class CartController {
  public static async create(req: MyRequest, res: Response) {
    try {
      const { deviceId, quantity } = req.body;
      const device = await DeviceService.get(deviceId)
      const deviceResponse = new Device(device)

      const { quantity: availableQuantity, price } = deviceResponse;

      if (quantity > availableQuantity) {
        const errPayload = {
          error: 'Out of stock',
          message: 'Insufficient quantity - Quantity is greater than available stock quantity',
        };
        return ResourceHandler.badRequest(res, errPayload);
      }

      const totalPrice = price * quantity
      const roundedPrice = Math.round(totalPrice * 100) / 100;

      const cartPayload = {
        userId: req.user.id,
        deviceId: deviceId,
        quantity: quantity,
        price: roundedPrice,
        isActive: true
      }

      const cart = await CartService.create(cartPayload)
      const cartResponse = new CartResponse(cart)

      return res.json(cartResponse.build())
    } catch (err) {
      if (err instanceof DatabaseError) {
        return err.handle(res)
      }

      const errPayload = {error: 'Failed to create a cart', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }

  public static update(req: MyRequest, res: Response) {
    try {

    } catch (err) {
      if (err instanceof DatabaseError) {
        return err.handle(res)
      }

      const errPayload = {error: 'Failed to update a cart', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }

}

export default CartController