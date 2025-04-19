import { AxiosRequestConfig } from 'axios';

export const registerUserConfig = (data: { username: string }): AxiosRequestConfig => ({
    url: '/register-user',
    method: 'POST',
    data,
});