export enum UserRoles {
  CLIENT = 'client',
  ADMIN = 'admin'
}

export interface UserEntity {
  id: string;
  email: string;
  password?: string;
  refreshId?: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  isActive: boolean;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export enum UserAuthOrigins {
  APP = 'app',
  ADMIN = 'admin'
}

export interface UserCreateData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  clientId?: string;
  producerId?: string;
  isActive?: boolean;
}
