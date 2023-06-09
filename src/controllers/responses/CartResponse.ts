import Cart from "../../models/CartModel";

class CartResponse {
  public includeUser = false
  constructor(private cart: Cart) { }

  public build() {
    return {
      ...this.setCartData(),
      ...this.includeUser && {user: this.setUserData()},
      device: this.setDeviceData()
    }
  }

  private setCartData() {
    return {
      id: this.cart.id,
      quantity: this.cart.quantity,
      price: this.cart.price,
      isActive: this.cart.isActive
    }
  }

  private setUserData() {
    const user = this.cart.user

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName
    }
  }

  private setDeviceData() {
    const device = this.cart.device

    return {
      id: device.id,
      name: device.name,
      price: device.price,
      description: device.description
    }
  }
}

export default CartResponse
