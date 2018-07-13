import { userRoles } from './userRoles';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: userRoles;
}