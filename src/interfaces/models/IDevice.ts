import { BrandEntity } from "./IBrand";
import { CategoryEntity } from "./ICategory";

export interface DeviceEntity {
  id: string;
  categoryId: string;
  brandId: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  category: CategoryEntity;
  brand: BrandEntity;
}
