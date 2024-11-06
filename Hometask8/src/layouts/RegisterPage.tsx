import React from 'react';
import { Box } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
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
            <RegisterForm />
        </Box>
    );
};

export default RegisterPage;