import React from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { doRegisterThunk } from '../store/slices/userSlice';
import { UserFormPropsI } from '../api/userActions';
import { history } from '../api/navigate';

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const form = event.currentTarget;
        const usernameInput = form.elements.namedItem('username') as HTMLInputElement;
        const usernamePassword = form.elements.namedItem('password') as HTMLInputElement;

        const userData: UserFormPropsI = {
            username: usernameInput.value,
            password: usernamePassword.value
        };
        dispatch(doRegisterThunk(userData));
        history.push('/login'); 
      };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleRegister}>
                <TextField
                    fullWidth
                    label="Username"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    name="username"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    name="password"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                >
                    Register
                </Button>
                <Typography variant="body2" align="center">
                    Already have an account?{' '}
                    <Link href="/login" underline="hover">
                        Login
                    </Link>
                </Typography>
            </Box>
        </Paper>
    );
};

export default RegisterForm;