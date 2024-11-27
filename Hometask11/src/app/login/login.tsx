"use client"

import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '@/components/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                    padding: 2,
                }}>
            <LoginForm />
        </Box>
    );
};

export default LoginPage;