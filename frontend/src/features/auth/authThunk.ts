import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse, LoginRequest } from "../../types/auth";
import  api  from '../../configs/axios';

export const login = createAsyncThunk<AuthResponse, LoginRequest, { rejectValue: string }>(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await api.post('/auth/logout');

            localStorage.removeItem('authToken');

        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Logout failed');
        }
    }
);