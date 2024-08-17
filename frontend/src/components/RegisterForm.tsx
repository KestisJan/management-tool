import React, { useState} from "react";
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { Auth } from "../services/auth.services";

const RegisterForm: React.FC = () => {
    
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            console.log(formData.password, formData.confirmPassword)
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const auth = new Auth();
            const response = await auth.register(formData);
        } catch (err: any) {
            console.error('Registration failed: ', err);
            setError('Registration failed. Please try again.');
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
                    Registration
                </Typography>
                <Box
                    component="form"
                    sx={{ mt: 1}}
                    onSubmit={handleSubmit}
                    className="w-full"
                >   <Box className="flex justify-between space-x-4">
                        <TextField 
                            margin="normal"
                            required
                            id="name"
                            label="First Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            sx={{ mb: 2, width: '50%' }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            label="Last Name"
                            name="lastname"
                            sx={{ mb: 2, width: '50%' }}
                        />
                    </Box>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Password Confirmation"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    {error && (
                        <Typography color="error" className="text-center mb-2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default RegisterForm