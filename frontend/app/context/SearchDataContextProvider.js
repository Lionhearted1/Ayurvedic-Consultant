import { useState, useEffect } from "react";
import { SearchDataContext } from "./SearchDataContext"; // Import your SearchDataContext
import { useCookies } from "react-cookie";

export const SearchDataContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);
  const [cookies, setCookie] = useCookies(["searchData"]);

  useEffect(() => {
    // Load searchData from cookies on mount
    const searchDataFromCookie = cookies.searchData;
    if (searchDataFromCookie) {
      setSearchData(searchDataFromCookie);
    }
  }, []);

  useEffect(() => {
    // Save searchData to cookies whenever it changes
    setCookie("searchData", searchData);
  }, [searchData, setCookie]);

  return (
    <SearchDataContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchDataContext.Provider>
  );
};
