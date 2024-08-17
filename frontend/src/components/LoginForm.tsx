import React from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';


const LoginForm: React.FC = () => {
    return (
        <Container component="main" maxWidth="xl" sx={{width: 'auto'}}>
            <Box 
                className="
                    flex flex-col items-center
                    p-10
                    w-full
                    h-auto
                    mb-15
                    rounded-lg
                    bg-gray-50
                    shadow-md
                    border border-gray-300
                    overflow-auto
                    max-w-[700px]
                "
            >
                <Typography component="h1" variant="h5" className="text-blue-900 font-bold">
                    Login
                </Typography>
                <Box
                    component="form"
                    sx={{ mt: 1}}
                    className="w-full"
                >   
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginForm