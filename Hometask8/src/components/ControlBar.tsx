import React from 'react';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const ControlBar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const dispatch = useDispatch();
    // const user = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    
                    <div>
                        {isAuthenticated ? (
                            <>
                                <Button color="inherit" component={Link} to="/my-posts">
                                    My Posts
                                </Button>
                                <Button color="inherit" component={Link} to="/new-post">
                                    New Post
                                </Button>
                                <Button color="inherit" component={Link} to="/login" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/register">
                                    Register
                                </Button>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
    );
};

export default ControlBar;