import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Divider } from '@mui/material';

function Navbar() {
    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: '15%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '15%',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Rick & Morty App
                    </Typography>
                </Toolbar>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/">
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/heroes">
                            <ListItemText primary="Heroes" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/about">
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default Navbar;