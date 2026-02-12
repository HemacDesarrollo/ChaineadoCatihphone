import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

export default function PuntosConexionScreen() {
  const [filtro, setFiltro] = useState("Todos");

  const data = [
    {
      id: "HC950",
      estado: "Activo",
    },
    {
      id: "HC990",
      estado: "Pendiente",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View
        style={[
          styles.estadoBadge,
          item.estado === "Activo"
            ? styles.activo
            : styles.pendiente,
        ]}
      >
        <Text style={styles.estadoText}>{item.estado}</Text>
      </View>

      <Text style={styles.codigo}>#{item.id}</Text>

      <Text style={styles.info}>Total de Tickets: (--) </Text>
      <Text style={styles.info}>Tickets Pendientes: (--)</Text>
      <Text style={styles.info}>Nombre del inmueble: (--)</Text>
      <Text style={styles.info}>Temática: (--)</Text>
      <Text style={styles.info}>Clasificación: (--)</Text>
      <Text style={styles.info}>Municipio: (--)</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#0076A7", "#003B5C"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
       
        <View style={styles.header}>
          <View style={styles.iconCard}>
          <Icon name="ticket" size={35} color="#000000ff" />
          </View>
          <Text style={styles.headerTitle}>Puntos {"\n"} Conexión</Text>
           <View style={[styles.iconCards, {marginLeft:30}]}>
           <Icon name="notifications" size={35} color="#000000ff" />
           </View>
            <View style={[styles.iconCards,{marginLeft:30}]}>
            <Icon name="person" size={35} color="#000000ff" />
            </View>
             </View>
        <View style={styles.margen}>
      
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#555" />
          <TextInput
            placeholder="Buscar por ID o Titulo"
            placeholderTextColor="#777"
            style={styles.input}
          />
        </View>

        <View style={styles.cardMenu}>
          {[
            { label: "Mis\nTickets", icon: "ticket-outline" },
            { label: "Nuevo\nTicket", icon: "add-circle-outline" },
            { label: "Puntos de\nConexión", icon: "wifi-outline" },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.MenuButton,
                filtro === item.label && styles.filtroActivo,
              ]}
              onPress={() => setFiltro(item.label)}
            >
              <View style={styles.buttonContent}>
                <Icon name={item.icon} size={22} color="#fff" />
                <Text style={styles.MenuText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>


      
        <View style={styles.filtroContainer}>
          <Text style={styles.filtroLabel}>Filtrar:</Text>

          {["Todos", "Activos", "Pendientes"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filtroButton,
                filtro === item && styles.filtroActivo,
              ]}
              onPress={() => setFiltro(item)}
            >
              <Text
                style={[
                  styles.filtroText,
                  filtro === item && { color: "#0076A7" },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.TextResul}>
        <Text style={styles.listTitle}>
          Listado de Puntos {"\n"}de Conexión
        </Text>
        <Text style={styles.listTitle}>Mostrando (--) resultados</Text>
        </View> 
        
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  iconCard: {
  backgroundColor: "#fff",
  width: 60,
  height: 40,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 4,
  marginTop: 25
},
iconCards: {
  backgroundColor: "#fff",
  width: 40,
  height: 40,
  borderRadius: 50,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 4,
  marginTop: 25,
},
header: {
  backgroundColor: "#016C90",
  height: 100,
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
},

 headerTitle: {
  fontSize: 22,
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: 5,
  marginLeft: 10,
  marginTop: 25
},
margen: {
 paddingHorizontal: 20
},
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
    margin: 12
  },
  cardMenu: {
    backgroundColor: "#2680B2",
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: "#000",
  },
  filtroContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  filtroLabel: {
    color: "#fff",
    marginRight: 10,
  },
  filtroButton: {
    backgroundColor: "#0076A7",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginRight: 10,
    marginTop: 5,
    borderColor: "#FFFFFF",
    borderWidth: 1
  },
  filtroActivo: {
    backgroundColor: "#D9F2FF",
  },
  filtroText: {
    color: "#fff",
  },
  listTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  estadoBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  activo: {
    backgroundColor: "#4CAF50",
  },
  pendiente: {
    backgroundColor: "#FF5252",
  },
  estadoText: {
    color: "#fff",
    fontWeight: "bold",
  },
  codigo: {
    position: "absolute",
    right: 20,
    top: 20,
    fontWeight: "bold",
  },
  info: {
    marginBottom: 5,
    color: "#333",
  },
  buttonContent: {
  flexDirection: "row",
  alignItems: "center",
  gap: 2, 
  height: 30,
  width: 90,
},

MenuText: {
  color: "#fff",
  fontSize: 12,
  textAlign: "center",
},
MenuButton: {
    flex:1,
    backgroundColor: "#0076A7",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 50,
    marginRight: 6,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center"
  },
TextResul: {
  flexDirection: "row",
  alignItems: "center",
  gap: 20,
},
});
