import { AxiosRequestConfig } from 'axios';

export const getRandomDestinationConfig = (): AxiosRequestConfig => ({
    url: '/destination/random',
    method: 'GET',
});

export const checkAnswerConfig = (data: { cityId: string; guess: string; username: string }): AxiosRequestConfig => ({
    url: '/answer',
    method: 'POST',
    data,
});

export const getScoreConfig = (username: string): AxiosRequestConfig => ({
    url: `/score/${username}`,
    method: 'GET',
});
