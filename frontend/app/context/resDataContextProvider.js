import { useState ,useEffect} from "react";
import { ResDataContext } from "./ResDataContext";
import { useCookies } from "react-cookie";

export const ResDataContextProvider = ({ children }) => {
    const [resData, setResData] = useState(null);
    const [cookies, setCookie] = useCookies(["resData"]);

    useEffect(() => {
      // Load resData from cookies on mount
      const resDataFromCookie = cookies.resData;
      if (resDataFromCookie) {
        setResData(resDataFromCookie);
      }
    }, []);
  
    useEffect(() => {
      // Save resData to cookies whenever it changes
      setCookie("resData", resData);
    }, [resData]);


    return (

        <ResDataContext.Provider value={{ resData, setResData }}>
            {children}
        </ResDataContext.Provider>
    )
}