import axiosInstance from "./axiosInstance";
import { UserI } from "./userActions";

export interface ExhibitPropsI {
    id: number,
    imageUrl: string,
    description: string;
    user: UserI;
    createdAt: string;
    commentCount: number;
}

export interface ExhibitsResponseI {
    data: ExhibitPropsI[];
    lastPage: number;
}

export const fetchExhibits = async (page: number, limit: number, filter: string): Promise<ExhibitsResponseI> => {
    const response = await axiosInstance.get<ExhibitsResponseI>(`api/exhibits/${filter}`, {
        params: { page, limit }
    });
    return response.data;
};

export const fetchExhibitById = async (id: number): Promise<ExhibitPropsI> => {
    const response = await axiosInstance.get<ExhibitPropsI>(`/api/exhibits/post/${id}`);
    return response.data;
};

export const addExhibit = async (formData: FormData) => {
    const response = await axiosInstance.post('/api/exhibits', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data;
};

export const removeExhibit = async (id: number) => {
    const response = await axiosInstance.delete(`/api/exhibits/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};