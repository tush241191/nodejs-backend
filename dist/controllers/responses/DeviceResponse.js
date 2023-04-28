"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeviceResponse {
    constructor(device) {
        this.device = device;
    }
    build() {
        const deviceData = {
            id: this.device.id,
            name: this.device.name,
            description: this.device.description,
            quantity: this.device.quantity,
            price: this.device.price,
            category: {
                id: this.device.category.id,
                name: this.device.category.name
            },
            brand: {
                id: this.device.brand.id,
                name: this.device.brand.name
            },
            isActive: this.device.isActive
        };
        return deviceData;
    }
}
exports.default = DeviceResponse;
//# sourceMappingURL=DeviceResponse.js.map