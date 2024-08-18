import React from 'react';
import { RegisterForm } from '../components';
import { Box } from '@mui/material';

const Signup: React.FC = () => {
    return (
        <Box
            className="
                flex
                items-center
                mt-auto mb-auto
                py-12
                h-full
            "
            >
                <RegisterForm />
            </Box>
    )
};


export default Signup;