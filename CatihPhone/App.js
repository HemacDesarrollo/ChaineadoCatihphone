import React from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <AppNavigator />
    </NavigationContainer>
  );
}
 