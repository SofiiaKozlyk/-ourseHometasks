import React from "react";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { ExhibitPropsI } from "../api/exhibitActions";
import axiosInstance from "../api/axiosInstance";


const Post: React.FC<{ exhibit: ExhibitPropsI }> = ({ exhibit }) => {

    return (
        <>
            <Card sx={{ maxWidth: 345, mb: 2 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={`${axiosInstance.defaults.baseURL}${exhibit.imageUrl}`}
                    alt="Exhibit image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {exhibit.description}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default Post;