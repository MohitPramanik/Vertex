export type UserRole = 'manager' | 'admin' | 'hr' | 'employee' | 'superAdmin' | 'candidate';

export interface User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    managerId?: string;
}
