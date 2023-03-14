import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

var access: string | null = '';
if(typeof window !== 'undefined') {
    access = window.localStorage.getItem('access_token');
}

const AxiosWithContentType = (contentType: string) => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            'Content-Type': contentType,
        }
    })

    axiosInstance.interceptors.request.use((config: any) => {
        if(access) {
            config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
    }, (error: any) => {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use((response: any) => {
        return response;
    }, (error: any) => {
        if(error.response.status === 401) {
            window.localStorage.removeItem('access_token');
        }
        return Promise.reject(error);
    });

    return axiosInstance;
}

export const AppAxios = AxiosWithContentType('application/json');
export const MultiPartAxios = AxiosWithContentType('multipart/form-data');