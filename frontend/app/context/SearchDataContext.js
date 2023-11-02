import { createContext, useContext } from "react";

export const SearchDataContext = createContext();

export const useSearchDataContext=()=>{
    return useContext(SearchDataContext);
}
