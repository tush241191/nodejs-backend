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
            inStock: this.device.quantity,
            price: this.device.price,
            category: this.device.category.name,
            brand: this.device.brand.name,
            isActive: this.device.isActive
        };
        return deviceData;
    }
}
exports.default = DeviceResponse;
//# sourceMappingURL=DeviceResponse.js.map