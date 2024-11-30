"use client"

import React, { useState, useEffect} from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { addExhibit } from '../api/exhibitActions';
import { useRequest } from 'ahooks';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const validationSchema = Yup.object({
    description: Yup.string()
        .required('Required')
        .min(4, 'Must be at least 4 characters')
});

const NewPostForm = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();
    
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/exhibits'); 
        }
    }, [isAuthenticated, router]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };

    const { loading, run: addNewItem } = useRequest(addExhibit, {
        manual: true,
        onSuccess: () => {
            router.push('/');
        }
    });

    const handleSubmit = (values: { description: string }) => {
        if (!image) {
            console.error('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', values.description);

        addNewItem(formData);
        setImagePreview(null);
        setImage(null);
    };

    return (
        <Formik
            initialValues={{ description: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: 400,
                        margin: 'auto',
                        padding: 16,
                        border: '1px solid #ccc',
                        borderRadius: 8,
                    }}
                >
                    <Typography variant="h5" component="h2" gutterBottom>
                        Create New Exhibit
                    </Typography>
                    {imagePreview && (
                        <Box
                            component="img"
                            src={imagePreview}
                            alt="Selected"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                marginBottom: 2,
                                borderRadius: 2,
                            }}
                        />
                    )}
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                handleImageChange(e);
                                const file = e.target.files ? e.target.files[0] : null;
                                if (file) {
                                    setImagePreview(URL.createObjectURL(file));
                                } else {
                                    setImagePreview(null);
                                }
                            }}
                        />
                    </Button>
                    <Field
                        as={TextField}
                        label="Description"
                        name="description"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ marginTop: 2 }}
                        error={touched.description && Boolean(errors.description)}
                        helperText={<ErrorMessage name="description" />}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ marginTop: 2 }}
                    >
                        {loading ? 'Creating...' : 'Create Exhibit'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default NewPostForm;