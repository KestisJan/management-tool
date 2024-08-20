import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Avatar, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const UserProfileComponent: React.FC = () => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container component="main" maxWidth="xl" sx={{ width: 'auto' }}>
           <Box className="
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
           ">
                <Box className="w-full flex justify-between items-center mb-4">
                    <Typography component="h1" variant="h5" className="text-blue-900 font-bold">
                        User Profile
                    </Typography>
                    <Button variant="outlined" onClick={handleBack} className="bg-gray-200 hover:bg-gray-300">
                        Back
                    </Button>
                </Box>
                <Box className="flex items-center justify-center my-4">
                    <Avatar/>
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        sx={{ ml: 2 }}
                    >
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                        />
                        <PhotoCamera />
                    </IconButton>
                </Box>
                <Box 
                    component="form"
                    sx={{ mt: 1 }}
                    className="w-full"
                >
                    <Box className="flex justify-between space-x-4">
                        <TextField
                            margin="normal"
                            required
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            sx={{ mb: 2, width: '50%'}}
                        />
                        <TextField
                            margin="normal"
                            required
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            sx={{ mb: 2, width: '50%' }}
                        />
                    </Box>
                    <Box className="flex justify-between space-x-4">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box sx={{ mt: 2}}>
                                <DatePicker
                                    label="Select Date"
                                    value={selectedDate}
                                    onChange={(newValue) => setSelectedDate(newValue)}
                                />
                            </Box>
                        </LocalizationProvider>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email address"
                            name="email"
                            sx={{ mb: 2}}
                        />
                    </Box>
                    <Box className="flex justify-between space-x-4">
                        <TextField
                            margin="normal"
                            required
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            sx={{ mb: 2, width: '50%'}}
                        />
                        <TextField
                            margin="normal"
                            required
                            id="city"
                            label="City"
                            name="city"
                            sx={{ mb: 2, width: '50%'}}
                        />
                    </Box>
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        id="address"
                        label="Address"
                        name="address"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, p: 2 }}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Update
                    </Button>
                </Box>
           </Box>
        </Container>
    )
}

export default UserProfileComponent;