import { User } from '../interfaces/User'


export type RegisterRequest = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    date_of_birth: string;
    profile_picture?: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};


export interface AuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: User; 
    error?: string;
    message?: string;
};



