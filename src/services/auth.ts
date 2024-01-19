/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie";
import { IFormInput } from "../interfaces";

const api_url = import.meta.env.VITE_API_URL;

export async function signupUser({ email, password, username }: IFormInput) {
    const url = `${api_url}/users/register`;
    const payload = { email, password, username, role: "user" };
    try {
        const { data, status, statusText } = await axios.post(url, payload);
        if (status == 500) throw new Error(statusText);

        return data;
    } catch(error: any) {
        const errorMessage = error.response.data.message;
        console.log('Failed to authenticate user. Reason:', errorMessage);
        throw error;
    }
}

export async function loginUser({ email, password }: IFormInput) {
    const url = `${api_url}/users/login`;
    const payload = { email, password };
    try {
        const { data, status, statusText } = await axios.post(url, payload);
        if (status == 500) throw new Error(statusText);
        
        return data;
    } catch(error: any) {
        const errorMessage = error.response.data.message;
        console.log('Failed to authenticate user. Reason:', errorMessage);
        throw error;
    }
}

export async function verifyAccount(code: string) {
    const url = `${api_url}/users/verify/${code}`;

    try {
        const { data, status, statusText } = await axios.get(url);
        if (status == 500) throw new Error(statusText);
        
        return data;
    } catch(error: any) {
        const errorMessage = error.response.data.message;
        console.log('Failed to authenticate user. Reason:', errorMessage);
        throw error;
    }
}

export async function confirmRegistration(id: string) {
    const url = `${api_url}/users/complete_registration/${id}`;

    try {
        const { data, status, statusText } = await axios.get(url);
        if (status == 500) throw new Error(statusText);
        
        return data;
    } catch(error: any) {
        const errorMessage = error.response.data.message;
        console.log('Failed to authenticate user. Reason:', errorMessage);
        throw error;
    }
}

export async function logout() {
    const url = `${api_url}/auth/logout`;

    try {
        Cookies.remove('accessToken');
        const { status, statusText } = await axios.get(url);
        if (status == 500) throw new Error(statusText);
    } catch(error: any) {
        const errorMessage = error.response.data.message;
        console.log('Failed to authenticate user. Reason:', errorMessage);
        throw error;
    }
}
