import axiosInstance from "./axiosInstance";

export interface LoginFormPropsI {
    username: string,
    password: string;
  }

export const doLogin = ({ username, password }: LoginFormPropsI) => {
    return axiosInstance.post('api/login', {
      username: username,
      password: password
    });
}