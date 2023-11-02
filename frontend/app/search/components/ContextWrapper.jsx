import { UserDataContextProvider } from "@/app/context/UserDataContextProvider";

import React from "react";

const ContextWrapper = ({ children }) => {
  return (
    <>
      <UserDataContextProvider>{children}</UserDataContextProvider>
    </>
  );
};

export default ContextWrapper;
