import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PuntosConexionScreen from "../screens/PuntosConexionScreen";
import RecuperarPasswordScreen from "../screens/RecuperarPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BottomMenu from "../components/BottonMenu";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

if (loading) return null; 

return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {user ? (
      <>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PuntosConexion" component={PuntosConexionScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="BottomMenu" component={BottomMenu} />
      </>
    ) : (
      <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RecuperarPassword" component={RecuperarPasswordScreen} options={{headerShown: false}} />
      </>
    )}
  </Stack.Navigator>
);
}
