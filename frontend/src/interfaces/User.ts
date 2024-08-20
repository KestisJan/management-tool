export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture?: string;
    role?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserProfile extends User {
    phone: string;
    city: string;
    address: string;
}