export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
}