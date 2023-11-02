import { useState, useEffect } from "react";
import { LogDataContext } from "./LogDataContext"; // Import your LogDataContext
import { useCookies } from "react-cookie";

export const LogDataContextProvider = ({ children }) => {
  const [logData, setLogData] = useState(false)
  const [cookies, setCookie] = useCookies(["logData"]);

  useEffect(() => {
    // Load logData from cookies on mount
    try{
        const logDataFromCookie = JSON.parse(cookies.logData);
    if (logDataFromCookie) {
      setLogData((logDataFromCookie));
    }
    }catch(error){
        console.log(error)
    }
    
  }, []);

  useEffect(() => {
    // Save logData to cookies whenever it changes
    setCookie("logData", JSON.stringify(logData));
  }, [logData, setCookie]);

  return (
    <LogDataContext.Provider value={{ logData, setLogData }}>
      {children}
    </LogDataContext.Provider>
  );
};
