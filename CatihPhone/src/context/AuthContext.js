import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = async () => {
    await SecureStore.deleteItemAsync("CATI_user");
    await SecureStore.deleteItemAsync("CATI_pass");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
