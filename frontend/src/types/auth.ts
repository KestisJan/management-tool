import { User } from '../interfaces/User'


export type RegisterRequest = {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
};


export interface AuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: User; 
    error?: string;
    message?: string;
}



