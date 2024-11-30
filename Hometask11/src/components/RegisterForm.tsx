"use client"

import React, { useEffect }  from 'react';
import { TextField, Button, Typography, Paper, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { doRegisterThunk } from '../store/slices/userSlice';
import { UserFormPropsI } from '../api/userActions';
import { LoginSchema } from './LoginForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/exhibits');
        }
    }, [isAuthenticated, router]);

    const handleRegister = (values: UserFormPropsI) => {
        dispatch(doRegisterThunk(values));
    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                Sign Up
            </Typography>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleRegister}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field 
                            as={TextField}
                            fullWidth
                            label="Username"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            name="username"
                            error={touched.username && Boolean(errors.username)}
                            helperText={<ErrorMessage name="username" />}
                        />
                        <Field 
                            as={TextField}
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            name="password"
                            error={touched.password && Boolean(errors.password)}
                            helperText={<ErrorMessage name="password" />}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Typography variant="body2" align="center">
                            Already have an account?{' '}
                            <Link href="/login" underline="hover">
                                Login
                            </Link>
                        </Typography>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
};

export default RegisterForm;