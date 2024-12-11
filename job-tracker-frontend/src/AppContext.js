import React, { createContext, useContext, useState } from "react";

// Create Context
const AppContext = createContext();

// Create Provider
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [users, setUsers] = useState([]); // Admin Dashboard users state

  return (
    <AppContext.Provider value={{ user, setUser, users, setUsers }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using context
export const useAppContext = () => {
  return useContext(AppContext);
};
