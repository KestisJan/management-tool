import { api, headerAPI } from '../configs/axios';
import { RegisterRequest, AuthResponse, LoginRequest } from '../types/auth';


export class Auth {
    
    public async register(userData: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/auth/register', userData, headerAPI);
            console.log(response);

            if (response.status !== 201) {
                console.error(`Registration failed with status code: ${response.status}`);
                throw Error(`Registration failed with status code: ${response.status}`);
            }

            const { access_token, user } = response.data;
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

    public async login(credentials: LoginRequest ): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials, headerAPI);

            if (response.status !== 200) {
                console.error(`Login failed with status code: ${response.status} `);
                throw Error(`Login failed with status code: ${response.status}`);
            }

            const { access_token, user} = response.data;

            if (!access_token) {
                console.error('Failed to log in. No JWT token received.');
                throw Error('Failed to log in. No JWT token received.');
            }

            if (!user) {
                console.error('Failed to log in. No user received.');
                throw Error('Failed to log in. No user received.');
            }

            localStorage.setItem('authToken', access_token);
            localStorage.setItem('currentUser', JSON.stringify(user));

            return response.data;

        } catch (err: any) {
            console.error('Login failed: ', err);
            throw err;
        }
    }
}