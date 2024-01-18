/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactElement, useState } from "react";
import { IUser } from "../interfaces";

export type UserContextType = {
    user: IUser | null,
    saveUser: (user: IUser) => void;
    clearUser: () => void;
};

export const userContext = createContext<UserContextType>({
    user: null,
    saveUser: () => {},
    clearUser: () => {}
});

export default function UserContextProvider({ children }: { children: ReactElement }) {
    const [user, setUser] = useState<IUser | null>(null);
    const saveUser = (user: IUser) => setUser(user);
    const clearUser = () => setUser({} as IUser);

    return (
        <userContext.Provider value={{ user, saveUser, clearUser }}>
            { children }
        </userContext.Provider>
    );
}
