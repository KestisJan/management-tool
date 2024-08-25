import api  from '../configs/axios';
import { UserProfile } from '../interfaces/User';

export class UserService {
    public async getUserProfile(userId: number): Promise<UserProfile> {
        try {
            const response = await api.get<UserProfile>(`/profile/${userId}`);
            if (response.status !== 200) {
                throw new Error(`Failed to fetch user profile. Status: ${response.status}`);
            }
            return response.data;
        } catch (err: any) {
            console.error('Error fetching user profile:', err)
            throw err;
        }
    }

    public async updateUserProfile(userId: number, userProfile: UserProfile): Promise<UserProfile> {
        try {
            const response = await api.put<UserProfile>(`/profile/${userId}`, userProfile);
            if (response.status !== 200) {
                throw new Error(`Failed to update user profile. Status: ${response.status}`);
            }
            return response.data;
        } catch (err: any) {
            console.error('Error updating user profile:', err);
            throw err;
        }
    }

}


