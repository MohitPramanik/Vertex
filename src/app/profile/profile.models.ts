export type UserRole = 'Employee' | 'Manager' | 'HR' | 'Admin';

export interface UserProfile {
  version: 1;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  location: string;
  joinedOn: string; // YYYY-MM-DD
  updatedAt: string; // ISO datetime
}

