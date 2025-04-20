import { axiosInstance } from '@/api/axiosInstance';
import { AxiosError } from 'axios';
import { registerUserConfig } from '@/apiConfig';
import { RegisterUserResponse } from './type';

export const registerUser = async (
    data: { username: string },
    setLoading: (loading: boolean) => void,
    onSuccess: (data: RegisterUserResponse) => void,
    onError: (error: string) => void
) => {
    setLoading(true);
    try {
        const config = registerUserConfig(data);
        const response = await axiosInstance.request(config);
        onSuccess(response.data);
    } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        const errMsg = err.response?.data?.error || 'Something went wrong';
        onError(errMsg);
    } finally {
        setLoading(false);
    }
};