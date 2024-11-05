import axiosInstance from "./axiosInstance";

export interface ExhibitPropsI {
    id: number,
    imageUrl: string,
    description: string;
}

export const fetchExhibits = (): Promise<{ data: ExhibitPropsI[] }> => {
    return axiosInstance.get('api/exhibits/');
};