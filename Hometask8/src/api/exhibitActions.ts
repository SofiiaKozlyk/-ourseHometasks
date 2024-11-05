import axiosInstance from "./axiosInstance";

export interface ExhibitAuthorI {
    id: number;
    username: string;
}

export interface ExhibitPropsI {
    id: number,
    imageUrl: string,
    description: string;
    user: ExhibitAuthorI;
    createdAt: string;
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



// export const fetchExhibits = async (): Promise<{ data: ExhibitPropsI[] }> => {
//     const response = await axiosInstance.get('api/exhibits/');
//     return response.data;
// };


// export const fetchExhibits = (): Promise<{ data: ExhibitPropsI[] }> => {
//     const response = axiosInstance.get('api/exhibits/');
//     return { data: response.data };
//     // return axiosInstance.get('api/exhibits/');
// };