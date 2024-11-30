"use client"

import React from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Box, Avatar, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { ExhibitPropsI, removeExhibit } from "../api/exhibitActions";
import axiosInstance from "../api/axiosInstance";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRequest } from 'ahooks';
import CommentStripe from "./CommentStripe";

interface PostPropsI {
    exhibit: ExhibitPropsI;
}

const Post: React.FC<PostPropsI> = ({ exhibit }) => {
    const currentUserId = useSelector((state: RootState) => state.user.userId);
    const isAuthor = currentUserId === exhibit.user.id;
    const formattedDate = new Date(exhibit.createdAt).toLocaleDateString();

    const { run: deleteExhibit } = useRequest(removeExhibit, {
        manual: true,
    });

    const handleDeleteItem = (id: number) => {
        deleteExhibit(id);
    };

    return (
        <Card sx={{ maxWidth: 500, mb: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1,
                    bgcolor: '#f0f0f0',
                    borderBottom: '1px solid #ddd'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                    <Typography sx={{ ml: 1 }} variant="body2">
                        {exhibit.user.username}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {formattedDate}
                </Typography>
                {isAuthor && (
                    <Tooltip title="Delete Post">
                        <IconButton onClick={() => handleDeleteItem(exhibit.id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            <CardMedia
                component="img"
                height="250"
                image={`${axiosInstance.defaults.baseURL}${exhibit.imageUrl}`}
                alt="Exhibit image"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {exhibit.description}
                </Typography>
                <CommentStripe exhibitId={exhibit.id} />
            </CardContent>
        </Card>

    );
}

export default Post;