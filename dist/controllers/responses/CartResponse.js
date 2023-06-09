"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CartResponse {
    constructor(cart) {
        this.cart = cart;
        this.includeUser = false;
    }
    build() {
        return Object.assign(Object.assign(Object.assign({}, this.setCartData()), this.includeUser && { user: this.setUserData() }), { device: this.setDeviceData() });
    }
    setCartData() {
        return {
            id: this.cart.id,
            quantity: this.cart.quantity,
            price: this.cart.price,
            isActive: this.cart.isActive
        };
    }
    setUserData() {
        const user = this.cart.user;
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
    setDeviceData() {
        const device = this.cart.device;
        return {
            id: device.id,
            name: device.name,
            price: device.price,
            description: device.description
        };
    }
}
exports.default = CartResponse;
//# sourceMappingURL=CartResponse.js.map