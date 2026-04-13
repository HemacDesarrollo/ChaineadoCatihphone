import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { guardarReciente } from "../utils/recientesStorage";
import STATUS_COLORS from "../utils/ColorsEstatus";
import styles from "../styles/theme/DetalleTicketStyle";

export default function DetalleTicketScreen() {
  const { theme, isDark } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  const { ticket } = route.params;

  useEffect(() => {
    if (ticket) {
      guardarReciente({ ...ticket });
    }
  }, []);

  const statusColor =
    STATUS_COLORS[ticket.estatus?.toUpperCase()] || "#6b7280";


  const fechaFormateada = new Date(ticket.fechaCreacion).toLocaleDateString(
    "es-MX",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
  console.log("TICKET:", ticket);
  return (
    <LinearGradient colors={
      isDark
        ? ["#0F172A", "#1E293B"]
        : ["#0076A7", "#003B5C"]
      } style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={{ flex: 1 }}>

        <AppHeader title="Detalle Ticket"/>

        <ScrollView contentContainerStyle={{ padding: 16 }}>

       
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: statusColor,
                borderWidth: 2,
                elevation: 4,
                shadowColor: "#000",
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
              },
            ]}
          >

  
            <View style={styles.topRow}>
              <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                <Text style={styles.statusText}>{ticket.estatus}</Text>
              </View>

              <Text style={[styles.ticketId, {color: theme.text}]}>
                #HE-{ticket.id_label}
              </Text>
            </View>

            <View style={[styles.divider, {borderBottomColor: theme.subText}]} />

  
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Información</Text>

            <View style={styles.infoRow}>
              <Icon name="document-text-outline" size={18} color="#3b82f6" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {ticket.tipoReporte}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="folder-outline" size={18} color="#f7bb07ff" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {ticket.nombreProyecto}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="location-outline" size={18} color="#f97316" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {ticket.nombreSitio}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="person-outline" size={18} color="#16a34a" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {ticket.usuario_atiende || "Sin asignar"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="calendar-outline" size={18} color="#8b5cf6" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {fechaFormateada}
              </Text>
            </View>

            <View style={[styles.divider, {borderBottomColor: theme.subText}]} />

          
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Descripción</Text>

            <Text style={[styles.description,{ color: theme.text}]}>
              {ticket.descripcion || "Sin descripción disponible"}
            </Text>

            <Icon
              name="attach-outline"
              size={28}
              color="#dd0f0fff"
              style={{ marginTop: 10 }}
            />

            <View style={[styles.divider, {borderBottomColor: theme.subText}]} />

       
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