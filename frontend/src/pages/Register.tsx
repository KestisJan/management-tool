import React from 'react';
import { RegisterForm } from '../components';
import { Box } from '@mui/material';

const Register: React.FC = () => {
    return (
        <Box
            className="
                bg-gray-100 min-h-screen flex items-center
            "
            >
                <RegisterForm />
            </Box>
    )
};


export default Register;