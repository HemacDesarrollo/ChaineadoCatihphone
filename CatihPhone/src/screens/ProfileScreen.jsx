import React, { useMemo, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useProfileViewModel from "../viewmodels/useProfileViewModel";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from "../components/UserAvatar";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../theme/ThemeContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();

  const {
    user,
    loading,
    totalTickets,
    stats,
    handleUpdatePhoto,
    handleLogout,
  } = useProfileViewModel();

  const { status } = useContext(AuthContext);

  const STATUS_COLORS = {
    "EN LINEA": "#16a34a",
    AUSENTE: "#f59e0b",
    DESCONECTADO: "#6b7280",
  };

  const statusBorderColor = useMemo(() => {
    return STATUS_COLORS[status] || "#6b7280";
  }, [status]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="default" />

      <AppHeader
        title="Perfil"
        onBack={() => navigation.goBack()}
        onNotificationPress={handleLogout}
      />

      <LinearGradient
        colors={
          isDark
            ? ["#0F172A", "#1E293B"]
            : ["#2176AE", "#F0F4F8"]
        }
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>

          <View style={styles.profileCard}>
            <TouchableOpacity onPress={handleUpdatePhoto}>
              
              <View style={[styles.avatarBig, { borderColor: statusBorderColor }]}>
                <UserAvatar size={60} />
              </View>

              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={18} color="#fff" />
              </View>

            </TouchableOpacity>

            <Text style={[styles.name, { color: theme.textTitle }]}>{user?.Usuario}</Text>

            <Text style={[styles.subText, {color: theme.textTitle}]}>
              {user?.Tipo_Usuario}
            </Text>


          
          </View>


          <View style={[styles.card, {backgroundColor: theme.card}]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Información</Text>

            <View style={styles.infoRow}>
              <Icon name="person-outline" size={20} color="#00a79f"  />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {user?.Nombre} {user?.Apellido}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="briefcase-outline" size={20} color="#0076A7" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {user?.Tipo_Usuario}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="call-outline" size={20} color="#16a34a" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {user?.telefono}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="mail-outline" size={20} color="#f59e0b" />
              <Text
                style={[styles.infoText, { color: theme.text }]}
                numberOfLines={1}
              >
                {user?.Correo}
              </Text>
            </View>
          </View>

          <View style={[styles.card, {backgroundColor: theme.card}]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Estadísticas</Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Ionicons name="clipboard" size={22} color="#0076A7" />
                <Text style={[styles.statValue, { color: theme.text }]}>{stats?.asignados || 0}</Text>
                <Text style={[styles.statLabel, { color: theme.text }]}>Asignados</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="checkmark-done" size={22} color="#16a34a" />
                <Text style={[styles.statValue, { color: theme.text }]}>{stats?.atendidos || 0}</Text>
                <Text style={[styles.statLabel, { color: theme.text }]}>Atendidos</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="podium" size={22} color="#f59e0b" />
                <Text style={[styles.statValue, { color: theme.text }]}>{totalTickets}</Text>
                <Text style={[styles.statLabel, { color: theme.text }]}>Total</Text>
              </View>
            </View>
          </View>

 
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>

        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = {
  profileCard: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  avatarBig: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  cameraIcon: {
    position: "absolute",
    bottom: -8,
    alignSelf: "center",
    backgroundColor: "#0076A7",
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },

  subText: {
    color: "#fff",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 26,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderColor: "#fff",
    borderWidth: 1,
    elevation: 3,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },

  infoText: {
    fontSize: 14,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statBox: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    fontSize: 12,
    color: "#555",
  },

  logoutButton: {
    backgroundColor: "#ef4444",
    marginHorizontal: 26,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
};