import axiosInstance from "./axiosInstance";

export interface CommentI {
    id: number;
    text: string;
    createdAt: string;
    user: {
        id: number;
        username: string;
    };
}

export const fetchComments = async (exhibitId: number): Promise<CommentI[]> => {
    const response = await axiosInstance.get(`/api/exhibits/${exhibitId}/comments`);
    return response.data;
};

export const addComment = async (exhibitId: number, text: string): Promise<CommentI> => {
    const response = await axiosInstance.post(`/api/exhibits/${exhibitId}/comments`, { text });
    return response.data;
};

export const removeComment = async (exhibitId: number, commentId: number): Promise<void> => {
    await axiosInstance.delete(`/api/exhibits/${exhibitId}/comments/${commentId}`);
};