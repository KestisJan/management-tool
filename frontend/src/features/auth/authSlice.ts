import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User';
import { AuthResponse } from '../../types/auth';
import { login, logout } from './authThunk';
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.accessToken = action.payload.access_token;
                state.user = action.payload.user;
                state.status = 'succeeded';
                state.error = null;
                localStorage.setItem('authToken', action.payload.access_token);
                localStorage.setItem('currentUser', JSON.stringify(action.payload.user));

            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as string) || 'Login failed';
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.accessToken = null;
                state.user = null;
                state.status = 'succeeded';
                state.error = null;
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');

            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = (action.payload as string) || 'Logout failed';
            });
    },
});

export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => !!state.auth.accessToken;
