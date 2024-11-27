import axiosInstance from "./axiosInstance";

export interface UserFormPropsI {
  username: string,
  password: string;
}

export interface UserI {
  id: number;
  username: string;
}

export const doLogin = ({ username, password }: UserFormPropsI) => {
  return axiosInstance.post('api/auth/login', {
    username: username,
    password: password
  });
}

export const doRegister = ({ username, password }: UserFormPropsI) => {
  return axiosInstance.post('users/register', {
    username: username,
    password: password
  });
};

export const fetchUserProfile = async (): Promise<UserI> => {
  const response = await axiosInstance.get<UserI>('/users/my-profile');
  return response.data;
};