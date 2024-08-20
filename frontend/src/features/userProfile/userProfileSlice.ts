import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from '../../interfaces/User';
import { UserService } from '../../services/userProfile.services';

interface UserProfileState {
    profile: UserProfile | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


const initialState: UserProfileState = {
    profile: null,
    status: 'idle',
    error: null,
};

export const fetchUserProfile = createAsyncThunk(
    'userProfile/fetchUserProfile',
    async (userId: number) => {
        const userService = new UserService();
        return await userService.getUserProfile(userId);
    }
);

export const updateUserProfile = createAsyncThunk<UserProfile, { userId: number; userProfile: UserProfile }>(
    'userProfile/updateUserProfile',
    async ({ userId, userProfile }) => {
        const userService = new UserService();
        return await userService.updateUserProfile(userId, userProfile);
    }
);


const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch profile';
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update profile';
            });
    },
});


export default userProfileSlice.reducer;
