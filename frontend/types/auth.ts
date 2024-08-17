import { User } from '../interfaces/User'


export type RegisterRequest = {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
};


export interface AuthResponse {
    user?: User;
    token: string;
    refreshToken?: string;
    error?: string;
    message?: string;
}



