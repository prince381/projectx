/* eslint-disable @typescript-eslint/no-unused-vars */
export interface IUser {
    email: string;
    password?: string;
    confirm_password?: string;
    username: string;
    isVerified: boolean;
    registrationCompleted: boolean;
    role: "user" | "admin" | "company";
    loginAttempts?: number;
    lockUntil?: number;
    googleId?: string;
}

export interface IFormInput {
    email: string;
    password?: string;
    confirm_password?: string;
    username: string;
}