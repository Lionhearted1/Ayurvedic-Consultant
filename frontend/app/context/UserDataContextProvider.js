import { useState, useEffect } from "react";
import { UserDataContext } from "./UserDataContext";
import { useCookies } from "react-cookie";

export const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  const [cookies, setCookie] = useCookies(["userData"]);

  useEffect(() => {
    // Load userData from cookies on mount
    const userDataFromCookie = cookies.userData;
    if (userDataFromCookie) {
      setUserData(userDataFromCookie);
    }
  }, [cookies.userData]); // Add cookies.userData as a dependency

  useEffect(() => {
    // Save userData to cookies whenever it changes
    setCookie("userData", userData); 
  }, [userData]);

  return (
    <UserDataContext.Provider value={{userData,setUserData}}>
      {children}
    </UserDataContext.Provider>
  );
};
