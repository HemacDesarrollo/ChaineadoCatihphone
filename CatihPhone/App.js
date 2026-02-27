import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { AuthContext } from "./src/context/AuthContext";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigator";
import { setupInterceptors } from "./src/api/connect";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}

function Main() {
  const { loginUser, logout } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  

  useEffect(() => {
    const validateToken = async () => {
      const token = await SecureStore.getItemAsync("CATI_token");

    useEffect(() => {
    setupInterceptors(logout);
    }, []);

      if (!token) {
        setChecking(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {

          await SecureStore.deleteItemAsync("CATI_token");
          logout();
        } else {
          loginUser(token);
        }
      } catch (error) {
        await SecureStore.deleteItemAsync("CATI_token");
        logout();
      }

      setChecking(false);
    };

    validateToken();
  }, []);

  if (checking) return null;

  return <AppNavigation />;
}
