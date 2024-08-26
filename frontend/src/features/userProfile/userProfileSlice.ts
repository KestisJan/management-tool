import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../interfaces/User';
import { fetchUserProfile, updateUserProfile } from './userProfileThunks';
import { RootState } from '../../store/store';

interface UserProfileState {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserProfileState = {
    profile: null,
    loading: false,
    error: null,
};

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.profile = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to fetch user profile';
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, ( state, action: PayloadAction<UserProfile>) => {
                state.profile = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to update user profile';
            });
    },
})

export default userProfileSlice.reducer;

export const selectUserProfile = (state: RootState) => state.userProfile.profile;
export const selectUserProfileLoading = (state: RootState) => state.userProfile.loading;
export const selectUserProfileError = (state: RootState) => state.userProfile.error;
