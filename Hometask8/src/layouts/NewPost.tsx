import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { addExhibit } from '../api/exhibitActions';
import { useRequest } from 'ahooks';
import { history } from '../api/navigate';

const NewPost = () => {
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };

    const { loading, run: addNewItem } = useRequest(addExhibit, {
        manual: true, onSuccess: (data) => {
            history.push('/');
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const descriptionInput = form.elements.namedItem('description') as HTMLInputElement;
        const description = descriptionInput.value;
        
        if (!image) {
            console.error('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);

        addNewItem(formData);
        form.reset();
    };

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
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 400,
                    margin: 'auto',
                    padding: 2,
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    Create New Exhibit
                </Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    name="description"
                    required
                    sx={{ marginTop: 2 }}
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
            </Box>
        </Box>
    );
}

export default NewPost;