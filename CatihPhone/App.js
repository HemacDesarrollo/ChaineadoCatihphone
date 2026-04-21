import React, { useContext, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {View,PanResponder,} from "react-native";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigator";
import { enableScreens } from "react-native-screens";
import { api } from "./src/api/connect";
import { ThemeProvider } from "./src/theme/ThemeContext";
import ThemeLoader from "./src/theme/ThemeLoader.js";

enableScreens();

function RootApp() {
  const { registerInteraction } = useContext(AuthContext);

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }} onTouchStart={registerInteraction}>

        {/* CONTENIDO NORMAL */}
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </View>

        {/* 🔥 OVERLAY GARANTIZADO ARRIBA */}
        <ThemeLoader />

      </View>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootApp />
    </AuthProvider>
  );
}