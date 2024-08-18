import React from 'react';
import { Box } from '@mui/material';
import { LoginForm } from '../components';


const Login: React.FC = () => {
    return (
        <Box className="
            flex
            items-center
            mt-auto mb-auto
            py-12
            h-full
        "
        >
            <LoginForm />
        </Box>
    )
};


export default Login;