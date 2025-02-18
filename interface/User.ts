export interface User {
    email: string;
    password: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
}