import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;