import React from 'react';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { doLogin } from '../api/userActions';
import { useRequest } from 'ahooks';

const LoginForm: React.FC = () => {
    const { loading, run } = useRequest(doLogin, {
        manual: true, onSuccess: (data) => {
          localStorage.setItem('token', data.data.access_token);
          console.log(data.data.access_token);
        }
      });
    
      const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const form = event.currentTarget;
        const usernameInput = form.elements.namedItem('username') as HTMLInputElement;
        const usernamePassword = form.elements.namedItem('password') as HTMLInputElement;
    
        //const data = run({ username: usernameInput.value, password: usernamePassword.value });
    
        console.log(usernameInput.value, usernamePassword.value);
      };

      if (loading) return <p>Loading...</p>;

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                Вхід
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