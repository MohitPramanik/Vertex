import { UserRole } from '../profile/profile.models';

export type UserStatus = 'Active' | 'Inactive';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string; // ISO datetime
  updatedAt?: string; // ISO datetime
}

