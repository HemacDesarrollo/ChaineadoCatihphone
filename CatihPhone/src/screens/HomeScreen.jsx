import React from "react";
import { Text, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useHomeViewModels from "../viewmodels/useHomeViewModel";
import { homeStyles } from "../styles/theme/homeStyles";
import MenuCard from "../components/MenuCard";

export default function HomeScreen({ navigation }) {
  const { user, goToTickets, goToInventario } =
    useHomeViewModels(navigation);

  return (
    <LinearGradient
      colors={["#0076A7", "#003B5C"]}
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safe}>
        <Text style={homeStyles.title}>CATIPHONE</Text>
        <Text style={homeStyles.subtitle}>
          Bienvenido {user?.Nombre}
        </Text>

        <MenuCard
          title="Ver Tickets"
          icon="ticket-outline"
          onPress={goToTickets}
        />

        <MenuCard
          title="Inventario"
          icon="cube-outline"
          onPress={goToInventario}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
