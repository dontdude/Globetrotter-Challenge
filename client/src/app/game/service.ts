import { axiosInstance } from '@/api/axiosInstance';
import {
    getRandomDestinationConfig,
    checkAnswerConfig,
    getScoreConfig,
} from '@/apiConfig';
import { AxiosError } from 'axios';
import {
    RandomDestinationResponse,
    AnswerResponse,
    ScoreResponse,
} from './type';

export const fetchRandomDestination = async (
    onSuccess: (data: RandomDestinationResponse) => void,
    onError: (error: string) => void
) => {
    try {
        const config = getRandomDestinationConfig();
        const response = await axiosInstance.request(config);
        onSuccess(response.data);
    } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        const errMsg = err.response?.data?.error || 'Something went wrong';
        onError(errMsg);
    }
};

export const submitAnswer = async (
    data: { cityId: string; guess: string; username: string },
    setLoading: (v: boolean) => void,
    onSuccess: (data: AnswerResponse) => void,
    onError: (error: string) => void
) => {
    setLoading(true);
    try {
        const config = checkAnswerConfig(data);
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

export const fetchScore = async (
    username: string,
    onSuccess: (data: ScoreResponse) => void,
    onError: (error: string) => void
) => {
    try {
        const config = getScoreConfig(username);
        const response = await axiosInstance.request(config);
        onSuccess(response.data);
    } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        const errMsg = err.response?.data?.error || 'Something went wrong';
        onError(errMsg);
    }
};