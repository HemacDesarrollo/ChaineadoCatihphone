import React from "react";
import { Text, SafeAreaView, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useHomeViewModels from "../viewmodels/useHomeViewModel";
import { homeStyles } from "../styles/theme/homeStyles";
import MenuCard from "../components/MenuCard";
import styles from "../styles/theme/DetalleTicketStyle";
import { useTheme } from "../theme/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { theme, isDark } = useTheme();
  const { user, goToTickets, goToInventario } =
    useHomeViewModels(navigation);

  return (
    <LinearGradient
    colors={
      isDark
      ? ["#0F172A", "#1E293B"]
      : ["#2176AE", "#c7ddf5ff"]
      }
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safe}>
        <Text style={homeStyles.title}>CATIPHONE</Text>
        <View style={homeStyles.imageContainer}>
          <Image source={require('../assets/imagen/catihLogo.png')} style={{width: 180, height: 180, borderRadius: 200 }}></Image>
        </View>
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
