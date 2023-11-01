import { createContext, useContext } from "react";

export const resDataContext = createContext();

export function useResDataContext() {
    return useContext(resDataContext);
}