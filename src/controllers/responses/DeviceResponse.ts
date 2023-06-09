import Device from "../../models/DeviceModel"

class DeviceResponse {
  constructor(private device: Device) { }

  public build() {
    const deviceData = {
      id: this.device.id,
      name: this.device.name,
      description: this.device.description,
      inStock: this.device.quantity,
      price: this.device.price,
      category: this.device.category.name,
      brand: this.device.brand.name,
      isActive: this.device.isActive
    }

    return deviceData
  }
}

export default DeviceResponse
