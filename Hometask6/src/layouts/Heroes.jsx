import React, { useState } from 'react';
import { CircularProgress, Typography, Toolbar, Drawer, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CharactersList from '../components/CharactersList';
import DirectionButton from '../components/DirectionButton';
import { useRequest } from 'ahooks';
import { getCharacters } from '../api/api';

import { useLocation, Outlet, useNavigate } from 'react-router-dom';

function Heroes() {
    const [url, setUrl] = useState();
    const [info, setInfo] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const { loading, data: characters } = useRequest(() => getCharacters(url), {
        refreshDeps: [url],
        onSuccess: (data) => {
            setInfo(data.info);
        },
        onError: (error) => {
            console.error("Failed to get characters:", error);
        }
    });

    const buttonClick = (direction) => setUrl(info[direction]);

    if (loading) {
        return <CircularProgress />;
    }

    const isRootRoute = location.pathname === '/heroes';

    const handleCloseDrawer = () => {
        navigate('/heroes'); 
      };

    return (
        <>
            <Box sx={{ width: '80%' }}>
                <CharactersList characters={characters.results} />
                <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                    <DirectionButton onClick={buttonClick} direction="prev" />
                    <Typography variant="h6" noWrap sx={{ mx: 2 }}>
                        Page {info.next ? new URL(info.next).searchParams.get('page') - 1 : info.pages}
                    </Typography>
                    <DirectionButton onClick={buttonClick} direction="next" />
                </Toolbar>
            </Box>

            {!isRootRoute && (
                <Drawer
                    variant="persistent"
                    anchor="right"
                    open={true}
                    sx={{
                        width: '25%',
                        flexShrink: 0,
                        '& .MuiDrawer-paper': { width: '25%' },
                    }}
                >
                    <IconButton onClick={handleCloseDrawer} sx={{ alignSelf: 'flex-end', m: 1 }}>
                        <CloseIcon />
                    </IconButton>
                    <Outlet />
                </Drawer>
            )}
        </>
    );
}

export default Heroes;