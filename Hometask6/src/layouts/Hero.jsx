import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useRequest } from 'ahooks';
import { getCharacterById } from '../api/api';

function Hero() {
    const { id } = useParams();

    const { loading, data: character } = useRequest(() => getCharacterById(id), {
        refreshDeps: [id],
        onError: (error) => {
            console.error("Failed to get character data:", error);
        }
    });

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Box
                component="img"
                src={character.image}
                alt={character.name}
                width={200}
                sx={{
                    borderRadius: '8px',
                    boxShadow: 2,
                    objectFit: 'cover',
                }}
            />
            <Typography variant="h4">{character.name}</Typography>
            <Typography variant="body1">Status: {character.status}</Typography>
            <Typography variant="body1">Species: {character.species}</Typography>
            <Typography variant="body1">Gender: {character.gender}</Typography>
            <Typography variant="body1">Location: {character.location.name}</Typography>
        </Box>
    );
}

export default Hero;