import axiosInstance from "./axiosInstance";

export interface ExhibitPropsI {
    id: number,
    imageUrl: string,
    description: string;
}

export interface ExhibitsResponseI {
    data: ExhibitPropsI[];
    lastPage: number;
}

export const fetchExhibits = async (page: number, limit: number): Promise<ExhibitsResponseI> => {
    const response = await axiosInstance.get<ExhibitsResponseI>('api/exhibits/', {
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



// export const fetchExhibits = async (): Promise<{ data: ExhibitPropsI[] }> => {
//     const response = await axiosInstance.get('api/exhibits/');
//     return response.data;
// };


// export const fetchExhibits = (): Promise<{ data: ExhibitPropsI[] }> => {
//     const response = axiosInstance.get('api/exhibits/');
//     return { data: response.data };
//     // return axiosInstance.get('api/exhibits/');
// };