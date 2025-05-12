import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Safe parser
  const parseUser = (key) => {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw && raw !== "undefined") {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error(`Failed to parse ${key} from sessionStorage`, e.message);
      sessionStorage.removeItem(key);
    }
    return null;
  };

  const [farmer, setFarmer] = useState(parseUser("farmer"));
  const [buyer, setBuyer] = useState(parseUser("buyer"));
  const [admin, setAdmin] = useState(parseUser("admin"));

  const [isFarmerLoggedIn, setIsFarmerLoggedIn] = useState(!!farmer);
  const [isBuyerLoggedIn, setIsBuyerLoggedIn] = useState(!!buyer);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!admin);

  return (
    <AuthContext.Provider
      value={{
        farmer,
        setFarmer,
        isFarmerLoggedIn,
        setIsFarmerLoggedIn,
        buyer,
        setBuyer,
        isBuyerLoggedIn,
        setIsBuyerLoggedIn,
        admin,
        setAdmin,
        isAdminLoggedIn,
        setIsAdminLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);