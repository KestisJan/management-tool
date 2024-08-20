import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import countryList from '../../data/country-list.json';
import { Auth } from '../../services/auth.services';

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        date_of_birth: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        const submitData = { ...formData };

        try {
            const auth = new Auth();
            const response = await auth.register(submitData)

        } catch (err: any) {
            console.error('Registration failed: ', err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xl" sx={{ width: 'auto' }}>
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
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                    className="w-full"
                >
                    <Box className="flex justify-between space-x-4">
                        <TextField 
                            margin="normal"
                            required
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            sx={{ mb: 2, width: '50%' }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            label="Last Name"
                            name="last_name"
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
                        id="date_of_birth"
                        label="Date of Birth"
                        name="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ mb: 2 }}
                    />
                    <Box className="flex space-x-4">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                    <Box className="flex space-x-4">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            sx={{ mb: 2, width: '48%' }}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                labelId="country-label"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleSelectChange}
                                sx={{ mb: 2, width: '48%', '& .MuiFormLabel-root': { color: 'blue'}}}
                            >
                                {countryList.map((country) => (
                                    <MenuItem key={country.code} value={country.code}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
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
                        type="password"
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
                        sx={{ mt: 3, mb: 2, p: 2 }}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;
