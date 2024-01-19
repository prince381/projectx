/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IUser } from "../interfaces";

const api_url = import.meta.env.VITE_API_URL;

export async function updateUser(id: number, token: string, payload: IUser) {
    const url = `${api_url}/users/${id}`;

    try {
        await axios.put(url, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Successfully updated user with id:', id);
    } catch(error: any) {
        throw new Error(error.message);
    }
}

export async function deleteUser(id: number, token: string) {
    const url = `${api_url}/users/${id}`;

    try {
        await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Successfully deleted user with id:', id);
    } catch(error: any) {
        throw new Error(error.message);
    }
}

export async function getUser(id: number, token: string) {
    const url = `${api_url}/users/${id}`;

    try {
        const { data, status, statusText } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (status == 500) throw new Error(statusText);

        return data as IUser;
    } catch(error: any) {
        throw new Error(error.message);
    }
}

export async function getAllUsers(token: string) {
    const url = `${api_url}/users`;

    try {
        const { data, status, statusText } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (status == 500) throw new Error(statusText);

        return data as IUser[];
    } catch(error: any) {
        throw new Error(error.message);
    }
}