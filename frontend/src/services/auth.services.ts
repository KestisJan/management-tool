import { api, headerAPI } from '../configs/axios';
import { RegisterRequest, AuthResponse } from '../types/auth';


export class Auth {
    
    public async register(userData: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/auth/register', userData, headerAPI);

            if (response.status !== 200) {
                console.error(`Registration failed with status code: ${response.status}`);
                throw Error(`Registration failed with status code: ${response.status}`);
            }

            const { access_token, expires_in, token_type, user } = response.data;
            if (!access_token) {
                console.error('Failed to register. No JWT token received.');
                throw Error('Failed to register. No JWT token received.');
            }

            if (!user) {
                console.error('Failed to register. No user received.');
                throw Error('Failed to register. No user received. ');
            }

            localStorage.setItem('authToken', access_token);
            localStorage.setItem('currentUser', JSON.stringify(user));

            return response.data;
        } catch (err: any) {
            console.error('Registration failed: ', err);
            throw err;
        }
    }
}