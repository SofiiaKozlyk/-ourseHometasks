import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Comment from "./Comment";
import { CommentI, fetchComments, addComment, removeComment } from "../api/commentActions";
import { useRequest } from 'ahooks';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface CommentStripeProps {
    exhibitId: number;
}

const CommentStripe: React.FC<CommentStripeProps> = ({ exhibitId }) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const [comments, setComments] = useState<CommentI[]>([]);
    const [showComments, setShowComments] = useState(false);

    const { loading, error, run: fetchCommentsAction } = useRequest(() => fetchComments(exhibitId), {
        manual: true,
        onSuccess: (data) => {
            setComments(data);
        },
    });

    useEffect(() => {
        fetchCommentsAction();
    }, []);

    const { loading: addLoading, run: addNewItem } = useRequest(addComment, {
        manual: true, onSuccess: (data) => {
            fetchCommentsAction();
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const commentInput = form.elements.namedItem('comment') as HTMLInputElement;
        const comment = commentInput.value;

        addNewItem(exhibitId, comment);
        form.reset();
    };

    const { run: deleteComment } = useRequest(removeComment, {
        manual: true,
        onSuccess: () => {
            fetchCommentsAction();
        }
    });

    const handleDeleteComment = (id: number) => {
        deleteComment(exhibitId, id);
    };

    const renderComments = () => {
        if (comments.length > 0) {
            return comments.map((comment) => (
                <Comment key={comment.id} comment={comment} onDelete={handleDeleteComment} />
            ));
        } else {
            return (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", marginTop: 2 }}>
                    No comments yet.
                </Typography>
            );
        }
    };

    return (
        <Box>
            <IconButton onClick={() => setShowComments(!showComments)}>
                <ArrowDropDownIcon />
            </IconButton>
            {showComments && (
                <Box>
                    <Box sx={{ maxHeight: 200, overflowY: "auto", marginTop: 2, padding: 1, border: "1px solid #ddd", borderRadius: "4px" }}>
                        {renderComments()}
                    </Box>

                    {isAuthenticated && (
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                            <TextField
                                label="Add a comment"
                                variant="outlined"
                                size="small"
                                name="comment"
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: 1 }}>
                                Send
                            </Button>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default CommentStripe;