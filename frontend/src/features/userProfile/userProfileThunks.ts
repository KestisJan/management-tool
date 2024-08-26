import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from '../../interfaces/User';
import { UserService } from '../../services/userProfile.services';

const userService = new UserService();

export const fetchUserProfile = createAsyncThunk<UserProfile, void, { rejectValue: string }>(
    'userProfile/fetchUserProfile',
    async (_, thunkAPI) => {
        try {
            const profile = await userService.getUserProfile();
            return profile;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || 'Failed to fetch user profile');
        }
    }
);

export const updateUserProfile = createAsyncThunk<UserProfile, { userId: number, profile: UserProfile }, { rejectValue: string }>(
    'userProfile/updateUserProfile',
    async ({ userId, profile }, thunkAPI) => {
        try {
            const updatedProfile = await userService.updateUserProfile(userId, profile);
            return updatedProfile;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || 'Failed to update user profile');
        }
    }
);
