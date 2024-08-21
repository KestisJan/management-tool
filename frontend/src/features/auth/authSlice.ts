import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User';
import { AuthResponse } from '../../types/auth';
import { RootState } from '../../store/store';

interface AuthState {
    accessToken: string | null;
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('authToken'),
    user: JSON.parse(localStorage.getItem('currentUser') || 'null') || null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<AuthResponse>) {
            state.accessToken = action.payload.access_token;
            state.user = action.payload.user;
            localStorage.setItem('authToken', action.payload.access_token);
            localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.status = 'failed';
            state.error = action.payload;
        },
        logout(state) {
            state.accessToken = null;
            state.user = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
        },
    }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => !!state.auth.accessToken;

