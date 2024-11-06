import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommentI } from "../api/commentActions";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface CommentPropsI {
    comment: CommentI;
    onDelete: (id: number) => void;
}

const Comment: React.FC<CommentPropsI> = ({ comment, onDelete }) => {
    const currentUserId = useSelector((state: RootState) => state.user.userId);
    const isAuthor = currentUserId === comment.user.id;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1, borderBottom: '1px solid #ccc' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2">{comment.user.username}</Typography>
                <Typography variant="caption">{new Date(comment.createdAt).toLocaleString()}</Typography>
            </Box>
            <Typography variant="body2" sx={{ marginTop: 1 }}>{comment.text}</Typography>
            {isAuthor && (
                <IconButton onClick={() => onDelete(comment.id)} sx={{ alignSelf: 'flex-end' }}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )}
        </Box>
    );
};

export default Comment;