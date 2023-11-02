import { createContext, useContext } from "react";

export const UserDataContext = createContext();

export function useUserDataContext() {
    return useContext(UserDataContext);
}