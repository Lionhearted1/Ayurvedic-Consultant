import { createContext, useContext } from "react";

export const LogDataContext = createContext();

export const useLogDataContext=()=>{
    return useContext(LogDataContext)
}


