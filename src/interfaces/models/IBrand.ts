import { DeviceEntity } from "./IDevice";

export interface BrandEntity {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  devices: DeviceEntity[];
}
