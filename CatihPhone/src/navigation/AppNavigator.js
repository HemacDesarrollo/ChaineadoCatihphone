import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import MisTickestScreen from "../screens/MisTicketsScreen";
import RecuperarPasswordScreen from "../screens/RecuperarPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BottomMenu from "../components/BottonMenu";
import DetalleTicketScreen from "../screens/DetalleTicketScreen";
import RecientesScreen from "../screens/recientesScreen";
import SitiosScreen from "../screens/SitiosScreen";
import DetalleSitiosScreen from "../screens/DetalleSitiosScreen";
import ImagenesTicketScreen from "../screens/ImagenesTicketsScreen";
import FormularioImagenScreen from "../screens/FormularioImagenScreen";
import EditarTicketScreen from "../screens/EditarTicketScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

if (loading) return null; 

return (
  <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "transparent" }, animation: "fade_from_bottom", }}>
    {user ? (
      <>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MisTickets" component={MisTickestScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="BottomMenu" component={BottomMenu} />
        <Stack.Screen name="DetalleTicket" component={DetalleTicketScreen} />
        <Stack.Screen name="Recientes" component={RecientesScreen}/>
        <Stack.Screen name="Sitios" component={SitiosScreen}/>
        <Stack.Screen name="DetalleSitios" component={DetalleSitiosScreen} />
        <Stack.Screen name="ImagenesTicket" component={ImagenesTicketScreen} />
        <Stack.Screen name="FormularioImagen" component={FormularioImagenScreen} />
        <Stack.Screen name="EditarTicket" component={EditarTicketScreen} />
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
