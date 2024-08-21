import axios from "axios";
import { error } from "console";

export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const headerAPI = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

const getHeaders = () => {
    const headers: { [key: string]: string } = {};

    const token = localStorage.getItem('accessToken');

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

api.interceptors.request.use(
    config => {
        config.headers = { ...headerAPI.headers, ...getHeaders(), ...config.headers };

        return config;
    },
    error => {
        return Promise.reject(error);
    }
)