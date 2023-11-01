import { useState } from "react";
import { resDataContext } from "./resDatacontext";

export const ResDataContextProvider = ({ children }) => {
    const [resData, setResData] = useState("Hello");
    return (

        <resDataContext.Provider value={{ resData, setResData }}>
            {children}
        </resDataContext.Provider>
    )
}