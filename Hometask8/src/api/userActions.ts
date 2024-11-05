import axiosInstance from "./axiosInstance";

export interface UserFormPropsI {
  username: string,
  password: string;
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