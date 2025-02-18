export interface User {
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
}