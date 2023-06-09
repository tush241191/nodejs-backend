import {Response} from "express";
import MyRequest from "../@types/global";
import CartService from "../services/CartService";
import CartResponse from "./responses/CartResponse";
import DatabaseError from "../exception/DatabaseError";
import ResourceHandler from "../exception/ResourceHandler";
import { UserRoles } from "../interfaces/models/IUser";

class CartController {
  public static async create(req: MyRequest, res: Response) {
    try {
      const cart = await CartService.create(req.user.id, req.body)
      const cartResponse = new CartResponse(cart)
      cartResponse.includeUser = req.user.role === UserRoles.ADMIN

      return res.json(cartResponse.build())
    } catch (err) {
      if (err instanceof DatabaseError) {
        return err.handle(res)
      }

      const errPayload = {error: 'Failed to create a cart', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }

  public static async list(req: MyRequest, res: Response) {
    try {
      const isAdmin = req.user.role === UserRoles.ADMIN
      const cartList = await CartService.list(req.user.id, isAdmin)
      const response = cartList.map(cart => {
        const resp = new CartResponse(cart)
        resp.includeUser = isAdmin
        return resp.build()
      })

      res.json(response)
    } catch (err) {
      if (err instanceof DatabaseError) {
        return err.handle(res)
      }

      const errPayload = {error: 'Failed to list cart', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }

  public static async update(req: MyRequest, res: Response) {
    try {
      const cart = await CartService.update(req.params.id, req.body)
      const cartResponse = new CartResponse(cart)
      cartResponse.includeUser = req.user.role === UserRoles.ADMIN

      return res.json(cartResponse.build())

    } catch (err) {
      if (err instanceof DatabaseError) {
        return err.handle(res)
      }

      const errPayload = {error: 'Failed to update a cart', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }

  public static async delete(req: MyRequest, res: Response) {
    try {
      await CartService.delete(req.params.id)
      
      return res
        .status(200)
        .send()

    } catch (err) {
      if (err instanceof DatabaseError) {
        return err.handle(res)
      }

      const errPayload = {error: 'Failed to delete a cart', message: err.message}
      return ResourceHandler.badRequest(res, errPayload)
    }
  }

}

export default CartController
