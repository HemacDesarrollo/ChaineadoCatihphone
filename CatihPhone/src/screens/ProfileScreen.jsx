import React, {useRef, useEffect} from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useProfileViewModel from "../viewmodels/useProfileViewModel";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/theme/profileStyles";
import Icon from "react-native-vector-icons/Ionicons";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../api/connect";



export default function ProfileScreen() {
   const navigation = useNavigation();
  const {
    user,
    authUser,
    loading,
    fullName,
    totalTickets,
    stats,
    statusStyleName,
    handleUpdatePhoto,
    handleLogout,
  } = useProfileViewModel();

  const STATUS_COLORS = {
    "EN LINEA": "#16a34a",
    "AUSENTE": "#f59e0b",
    "DESCONECTADO": "#6b7280",
  };
  useEffect(() => {
  console.log("Render con estado:", authUser?.Estatus);
}, [authUser?.Estatus]);

  const getStatusBorderColor = (estatus = "") => {
    const status = estatus.trim().toUpperCase();
    return STATUS_COLORS[status] || "#6b7280";
  }
  
{/*
  if (loading){
    return (
    <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator size="large" color="#3b82f6"/>
    </View>
    );
  }
    */}
  if (!user) return (
    <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator size="large" color="#3b82f6"></ActivityIndicator>
    </View>
  )
console.log("FOTO:", user.Fotografia);
console.log("URL FINAL:", `${API_BASE_URL}${user.Fotografia}`);

  return (


    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" />
      
      <AppHeader title="Perfil" onBack={() => navigation.goBack()} rightIcon="log-out-outline" onRightPress={handleLogout}/>

      
      <LinearGradient
        colors={["#0076A7", "#003B5C"]}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.card}>
            <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handleUpdatePhoto}>
              {loading ? (
                <ActivityIndicator size="large" color="#3b82f6" />
              ) : user.Fotografia ? (
              <Image source={{ uri: `${API_BASE_URL}${user.Fotografia}` }} style={[styles.avatar, {borderColor: getStatusBorderColor(authUser?.Estatus)}]} />
              ) : (
                <View style={[styles.avatarPlaceholder, {borderColor: getStatusBorderColor(authUser?.Estatus)}]}>
                  <Ionicons name="person" size={40} color="#fff" />
                </View>
              )}

              {/*
              <View style={[styles.statusCircle, styles[statusStyleName]]}> </View>
              */}

              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

            <Text style={styles.name}>{user.Usuario}</Text>


             <View style={styles.cardInformacion}>
                <Text style={styles.sectionTitle}>Información</Text>

                <View style={styles.infoRow}>
                  <Icon name="person-outline" size={20} color="#00a79fff" style={styles.infoIcon} />
                  <Text style={styles.infoText}>{user.Nombre} {user.Apellido}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="briefcase-outline" size={20} color="#0076A7" style={styles.infoIcon} />
                  <Text style={styles.infoText}>{user.Tipo_Usuario}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={20} color="#16a34a" style={styles.infoIcon} />
                  <Text style={styles.infoText}>{user.telefono}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="mail-outline" size={20} color="#f59e0b" style={styles.infoIcon} />
                  <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">{user.Correo}</Text>
                </View>
              </View>


            {/*
            <View style={[styles.statusBadge, styles[statusStyleName]]}>
              <Text style={styles.statusText}>{user.status}</Text>
            </View>
            */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Estadísticas</Text>
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Ionicons name="clipboard" size={24} color="#0076A7" />
                  <Text style={styles.statLabel}>Asignados</Text>
                  <Text style={styles.statValue} numberOfLines={1} ellipsizeMode="tail">222222222225</Text>
                </View>
                <View style={styles.statBox}>
                  <Ionicons name="checkmark-done" size={24} color="#16a34a" />
                  <Text style={styles.statLabel}>Atendidos</Text>
                  <Text style={styles.statValue} numberOfLines={1} ellipsizeMode="tail">3</Text>

                </View>
                <View style={styles.statBox}>
                  <Ionicons name="podium" size={24} color="#f59e0b" />
                  <Text style={styles.statLabel}>Total</Text>
                  <Text style={styles.statValue} numberOfLines={1} ellipsizeMode="tail">{totalTickets}</Text>
                </View>
              </View>
            </View>
          </View>
     
          {/*
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Permisos</Text>
            {user.permisos.map((permiso, index) => (
              <Text key={index} style={styles.permissionItem}>
                 {permiso}
              </Text>
            ))}
          </View>
          */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutTexto}>Cerrar Sesión</Text>
          </TouchableOpacity>
          
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}


