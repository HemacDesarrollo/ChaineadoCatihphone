import React, { useContext, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {View,PanResponder,} from "react-native";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import AppNavigation from "./src/navigation/AppNavigator";
import { enableScreens } from "react-native-screens";
import { api } from "./src/api/connect";

enableScreens();

function RootApp() {
  const { registerInteraction } = useContext(AuthContext);

  return (
    <View
      style={{ flex: 1 }}
      onTouchStart={registerInteraction}
    >
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootApp />
    </AuthProvider>
  );
}