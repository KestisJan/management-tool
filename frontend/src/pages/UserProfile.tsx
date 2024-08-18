import React from 'react';
import { UserProfileComponent } from '../components';
import { Box } from '@mui/material';

const UserProfile: React.FC = () => {
    return (
        <Box className="
            flex
            items-center
            mt-auto mb-auto
            py-12
            h-full
        "
        >
            <UserProfileComponent />
        </Box>
    )
};

export default UserProfile;