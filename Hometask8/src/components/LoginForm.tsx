import React from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { doLoginThunk } from '../store/slices/userSlice';
import { UserFormPropsI } from '../api/userActions';
import { history } from '../api/navigate';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const usernameInput = form.elements.namedItem('username') as HTMLInputElement;
        const usernamePassword = form.elements.namedItem('password') as HTMLInputElement;

        const userData: UserFormPropsI = {
            username: usernameInput.value,
            password: usernamePassword.value
        };
        dispatch(doLoginThunk(userData));
        history.push('/');
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                Login
            </Typography>
            <Box component="form" onSubmit={handleLogin}>
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
                    Login
                </Button>
                <Typography variant="body2" align="center">
                    Don’t have an account?{' '}
                    <Link href="/register" underline="hover">
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </Paper>
    );
};

export default LoginForm;