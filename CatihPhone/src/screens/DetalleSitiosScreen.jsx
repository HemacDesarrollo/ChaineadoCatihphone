import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Linking,
  TouchableOpacity
} from "react-native";
import MapView, {Marker} from 'react-native-maps'
import AppHeader from "../components/AppHeader";
import { useTheme } from "../theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles/theme/DetalleSitiosStyle";

export default function DetalleSitiosScreen() {
  const { theme, isDark } = useTheme();
  const route = useRoute();

  const { sitio } = route.params;

  const fechaFormateada = new Date(sitio.Fecha_Registro).toLocaleDateString(
    "es-MX",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
    <LinearGradient
      colors={
        isDark
          ? ["#0F172A", "#1E293B"]
          : ["#0076A7", "#003B5C"]
      }
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader title="Detalle Sitio" />

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: "#3b82f6",
                borderWidth: 2,
              },
            ]}
          >

            <View style={styles.topRow}>
              <Text style={[styles.ticketId, { color: theme.text }]}>
                {sitio.Codigo}
              </Text>

              <View style={styles.infoRow}>
              {/* <Icon name="calendar-outline" size={18} color="#8b5cf6" /> */}
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {fechaFormateada}
              </Text>
            </View>
            </View>

            <View style={[styles.divider, { borderBottomColor: theme.subText }]} />

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Proyecto
            </Text>

            {/* <View style={styles.infoRow}>
              <Icon name="business-outline" size={18} color="#3b82f6" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {sitio.Nombre}
              </Text>
            </View> */}

            <View style={styles.infoRow}>
              {/* <Icon name="folder-outline" size={18} color="#f7bb07" /> */}
              <Text style={[styles.infoText, { color: theme.text }]}>
                {sitio.nombreProyecto}
              </Text>
            </View>

            {/* <View style={styles.infoRow}>
              <Icon name="location-outline" size={18} color="#f97316" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {sitio.Direccion}
              </Text>
            </View> */}

            <View>
              <Text style={[styles.sectionTitle, {color: theme.text}]}>
                Ubicación
              </Text>
            </View>

            <View style={styles.infoRow}>
              {/* <Icon name="map-outline" size={18} color="#16a34a" /> */}
              <Text style={[styles.infoText, { color: theme.text }]}>
                {sitio.Municipio || "N/A"}, {sitio.Estado || "N/A"}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={[styles.infoText, { color: theme.text }]}>
                 Lat: {sitio.Latitud && Number(sitio.Latitud) !== 0
                  ? Number(sitio.Latitud).toFixed(4) + "..."
                  : "N/A"} |
                Lng: {sitio.Longitud && Number(sitio.Longitud) !== 0
                  ? Number(sitio.Longitud).toFixed(4) + "..."
                  : "N/A"}
                </Text>
            </View>

            <View style={[styles.infoRow]}>
              <Icon name="location-outline" size={18} color="#06b6d4" />
              <TouchableOpacity
                onPress={() => {
                    const url = `https://www.google.com/maps?q=${sitio.Latitud},${sitio.Longitud}`;
                    Linking.openURL(url);
                }}
                >
                <Text style={[styles.infoText, {color: "#06b6d4" }]}>Ver ubicación en Google Maps</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.divider, { borderBottomColor: theme.subText }]} />

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Descripción
            </Text>

            <Text style={[styles.infoText, { color: theme.text }]}>
              Sitio registrado dentro del sistema con código {sitio.Codigo}.
            </Text>

            <View style={styles.buttonRow}>

              <TouchableOpacity style={styles.btnPrimary}>
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnDanger}>
                <Text style={styles.btnText}>Finalizar</Text>
              </TouchableOpacity>

            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}