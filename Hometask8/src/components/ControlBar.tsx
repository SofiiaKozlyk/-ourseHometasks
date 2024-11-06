import React, { useEffect, useState } from 'react';
import { logout } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import { fetchUserProfile, UserI } from '../api/userActions';

const ControlBar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const [userProfile, setUserProfile] = useState<UserI | null>(null);
    const dispatch = useDispatch();
    
    const { loading, error, run: fetchUserAction } = useRequest(fetchUserProfile, {
        manual: true,
        onSuccess: (data) => {
            console.log("fetch");
            console.log(data);
            setUserProfile(data);
        },
    });

    useEffect(() => {
        if(isAuthenticated){
            fetchUserAction();
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {isAuthenticated &&  (
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Welcome, {userProfile?.username}
                    </Typography>
                )}
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