import { createContext, useContext } from "react";

export const ResDataContext = createContext();

export function useResDataContext() {
    return useContext(ResDataContext);
}