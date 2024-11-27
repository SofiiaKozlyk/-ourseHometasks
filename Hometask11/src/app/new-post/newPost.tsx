"use client"

import React from 'react';
import { Box } from '@mui/material';
import NewPostForm from '@/components/NewPostForm';

const NewPostPage: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <NewPostForm />
        </Box>
    );
};

export default NewPostPage;