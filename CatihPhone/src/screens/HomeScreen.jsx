import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View>
      <Text>Bienvenido {user.name}</Text>
    </View>
  );
}
