import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { guardarReciente, obtenerRecientes } from "../utils/recientesStorage";
import STATUS_COLORS from "../utils/ColorsEstatus";
import styles from "../styles/theme/DetalleTicketStyle";
import CameraWithCoords from "../components/CameraWithCoords";
import useDetalleTicketsViewModel from "../viewmodels/useDetalleTicketsViewModel";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../api/connect";


export default function DetalleTicketScreen() {
  const { theme, isDark } = useTheme();
  const route = useRoute();

  const idTicket =
  route.params?.idTicket || route.params?.ticket?.idTicket;
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImages] = useState([]);
  const { obtenerImagenes, obtenerDetalleTicket } = useDetalleTicketsViewModel();
  const [ticket, setTicket] = useState(route.params.ticket);


  const { user } = useContext(AuthContext);

  const [showImagenes, setShowImagenes] = useState(false);

  const navigation = useNavigation();

  const statusColor =
  STATUS_COLORS[ticket?.estatus?.toUpperCase()] || "#6b7280";


 const fechaFormateada = ticket?.fechaCreacion
  ? new Date(ticket.fechaCreacion).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  : "Sin fecha";
  // /.log("TICKET:", ticket);

  console.log("TICKET ACTUAL:", ticket);
  return (
    <LinearGradient colors={
      isDark
        ? ["#0F172A", "#1E293B"] 
        : ["#2176AE", "#c7ddf5ff"]
      } style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={{ flex: 1 }}>

        <AppHeader title="Detalle Ticket"/>

        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>

       
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
              <View style={{
                backgroundColor: statusColor,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8
              }}>
                <Text style={{
                  color: "#fff",
                  fontWeight: "bold"
                }}>
                  {ticket.estatus}
                </Text>
              </View>

              <Text style={[styles.ticketId, {color: theme.text}]}>
                #HE-{ticket.id_label}
              </Text>
            </View>

            <View style={[styles.divider, {borderBottomColor: theme.subText}]} />

            <Text style={[styles.sectionTitle, {color: theme.text}]}>
              Sitio
            </Text>
            <Text style={[styles.infoText, {color: theme.text}]}>
              {ticket.nombreSitio}
            </Text>

            <Text style={[styles.sectionTitle, {color: theme.text}]}>
                Categoria
            </Text>
            <View style={styles.infoRow}>
              {/* <Icon name="document-text-outline" size={18} color="#3b82f6" /> */}
              <Text style={[styles.infoText, { color: theme.text }]}>
                {ticket.tipoReporte}
              </Text>
            </View>

            <View>
              <Text style={[styles.sectionTitle,{ color: theme.text}]}>
                  Proyecto
              </Text>
            </View>
            <View style={styles.infoRow}>
              {/* <Icon name="folder-outline" size={18} color="#f7bb07ff" /> */}
              <Text style={[styles.infoText, { color: theme.text }]}>
                {ticket.nombreProyecto}
              </Text>
            </View>
            
            <View>
              <Text style={[styles.sectionTitle,{color: theme.text}]}>
                  Ubicación
              </Text>
            </View>
            <Text style={[styles.infoText, { color: theme.text }]}>
              {ticket.municipio}, {ticket.estado || ticket.Estado}
            </Text>
            <View style={styles.infoRow}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.infoText, { color: theme.text, marginTop: 4}]}>
                    {ticket.direccion || "Sin dirección"}
                  </Text>
                </View>
            </View>
           <View style={styles.infoRow}>
              <Text style={[styles.infoText, { color: theme.text }]}>
                  Lat: {ticket.latitud ? Number(ticket.latitud).toFixed(4) + "..." : "N/A"} | Lng: {ticket.longitud ? Number(ticket.longitud).toFixed(4) + "..." : "N/A"}
                </Text>
                </View>

                <View style={[styles.infoRow]}>
                  <Icon name="location-outline" size={18} color="#06b6d4" />
                  <TouchableOpacity
                    onPress={() => {
                        const url = `https://www.google.com/maps?q=${ticket.latitud},${ticket.longitud}`;
                        Linking.openURL(url);
                    }}
                    >
                    <Text style={[styles.infoText, {color: "#06b6d4" }]}>Ver ubicación en Google Maps</Text>
                    </TouchableOpacity>
                </View>

            <View>
              <Text style={[styles.sectionTitle,{color: theme.text}]}>
                  Responsable
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="person-outline" size={18} color="#00970dff" />
              <Text style={[styles.infoText, { color: theme.text }]}>
                {ticket.usuario_atiende || "Sin asignar"}
              </Text>
            </View>
            <View>

            <View>
              <Text style={[styles.sectionTitle,{color: theme.text}]}>
                  Fecha de Creación
              </Text>
            </View>
            </View>
            <View style={styles.infoRow}>
              {/* <Icon name="calendar-outline" size={18} color="#8b5cf6" /> */}
              <Text style={[styles.infoText, { color: theme.text }]}>
                {fechaFormateada}
              </Text>
            </View>

            <View style={[styles.divider, {borderBottomColor: theme.subText}]} />

          
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Descripción</Text>

            <Text style={[styles.infoText,{ color: theme.text}]}>
              {ticket.descripcion}
            </Text>
            
        
          <View style={{flexDirection: "row"}}>
            
            <TouchableOpacity onPress={() => setShowCamera(true)}>
            <Icon name="camera" size={28} color="#2fdd03ff" style={{marginTop: 10,}}></Icon>
            </TouchableOpacity>
          </View>

            <TouchableOpacity 
              style={{ flexDirection: "row", marginTop: 12 }}
              onPress={() => navigation.navigate("ImagenesTicket", {
                idTicket: ticket.idTicket
              })}
            >
              <Icon name="image" size={20} color={"#06b6d4"} />

              <Text style={{
                color: "#06b6d4",
                marginLeft: 4,
                textDecorationLine: "underline",
                fontWeight: "bold",
                fontSize: 16,
              }}>
                Mostrar Imágenes
              </Text>
            </TouchableOpacity>

            <View style={[styles.divider, {borderBottomColor: theme.subText}]} />

       
            <View style={styles.buttonRow}>

              <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}}
                onPress={() =>
                navigation.navigate("EditarTicket", {
                  ticket,
                  onGoBack: (updatedTicket) => setTicket(updatedTicket)
                })
              }
              >
                <Icon name="create-outline" size={38} color="#3b82f6" />
                <Text style={[styles.infoText, {color: theme.text}]}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnDanger}>
                <Text style={styles.btnText}>Finalizar</Text>
              </TouchableOpacity>

            </View>

          </View>
        </ScrollView>
        {showCamera && (
            <View style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}>
              <CameraWithCoords
                idTicket={ticket.idTicket}
                onImageTaken={(data) => {
                  setShowCamera(false);

                  navigation.navigate("FormularioImagen", {
                    idTicket: ticket.idTicket,
                    foto: data, 
                  });
                }}
                onClose={() => setShowCamera(false)}
              />
            </View>
          )}

      </SafeAreaView>
    </LinearGradient>
  );
}
