import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { Auth } from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../../features/auth/authThunk';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.email.length === 0) {
            setError('Email cannot be empty!');
            setLoading(false);
            return;
        }

        if (formData.password.length === 0) {
            setError('Password cannot be empty!');
            setLoading(false);
            return;
        }

        try {
            await dispatch(login(formData)).unwrap();
            navigate('/');
        } catch (err: any) {
            console.error('Login failed: ', err);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                    onSubmit={handleSubmit}
                >   
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 6, p: 2 }}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={loading}
                    >
                        Login
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </Box>
        </Container>
    )
}

export default LoginForm