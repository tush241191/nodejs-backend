import { DeviceEntity } from "./IDevice";

export interface CategoryEntity {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  devices: DeviceEntity[];
}
