import axiosInstance from "./axiosInstance";

export interface ExhibitPropsI {
    id: number,
    imageUrl: string,
    description: string;
}


export const fetchExhibits = async (): Promise<{ data: ExhibitPropsI[] }> => {
    const response = await axiosInstance.get('api/exhibits/');
    return response.data;
};


// export const fetchExhibits = (): Promise<{ data: ExhibitPropsI[] }> => {
//     const response = axiosInstance.get('api/exhibits/');
//     return { data: response.data };
//     // return axiosInstance.get('api/exhibits/');
// };