import React, { useState, useEffect, } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, FlatList, SafeAreaView,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../theme/ThemeContext";
import { stylesEdit } from "../styles/EditarTicketsStyles.js";
import { API_BASE_URL } from "../api/connect.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

export default function EditarTicketScreen({ route }) {
  const { user } = useContext(AuthContext);
  const { ticket } = route.params;
  const { theme, isDark } = useTheme();

  const [sitios, setSitios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [sitioSeleccionado, setSitioSeleccionado] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [animationVisible, setAnimationVisible] = useState(false);
  const [animationType, setAnimationType] = useState(null);
  const [loading, setLoading] = useState(false);

  const [direccion, setDireccion] = useState(ticket.direccion || "");
  const [municipio, setMunicipio] = useState(ticket.municipio || "");
  const [latitud, setLatitud] = useState(String(ticket.latitud || ""));
  const [longitud, setLongitud] = useState(String(ticket.longitud || ""));
  const [descripcion, setDescripcion] = useState(ticket.descripcion);

  const [modalVisible, setModalVisible] = useState(false);
  const [tipoLista, setTipoLista] = useState("");

useEffect(() => {
  cargarDatos();
}, []);

const cargarDatos = async () => {
  
  try {
    const resSitios = await fetch(`${API_BASE_URL}/APP/sitios/asignados`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const dataSitios = await resSitios.json();

    const resCategorias = await fetch(`${API_BASE_URL}/APP/tickets/categorias`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const dataCategorias = await resCategorias.json();

    const listaSitios = dataSitios.data || dataSitios;
    const listaCategorias = dataCategorias.data || dataCategorias;

    setSitios(listaSitios);
    setCategorias(listaCategorias);

    const sitioMatch = listaSitios.find(
      (s) => s.Nombre === ticket.nombreSitio
    );

    const normalizar = (txt) =>
      typeof txt === "string" ? txt.toLowerCase().trim() : "";

    const categoriaMatch = listaCategorias.find(
      (c) => normalizar(c.nombreCategoria) === normalizar(ticket.tipoReporte)
    );

    setSitioSeleccionado(sitioMatch || null);
    setCategoriaSeleccionada(categoriaMatch || null);

  } catch (error) {
    console.error("Error cargando datos:", error);
  }
};

 const guardarCambios = async () => {
  try {

    const body = {
      idSitio: sitioSeleccionado?.idSitio || ticket.idSitio,
      tipoReporte: categoriaSeleccionada?.idCategoria || ticket.idCategoria,

      municipio: municipio || ticket.municipio,
      direccion: direccion.trim() || ticket.direccion,

      latitud: latitud !== "" ? parseFloat(latitud) : ticket.latitud,
      longitud: longitud !== "" ? parseFloat(longitud) : ticket.longitud,

      descripcion: descripcion.trim() || ticket.descripcion
    };

    console.log("Datos a enviar:", body);

    const response = await fetch(`${API_BASE_URL}/APP/tickets/${ticket.idTicket}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log("RESPUESTA BACKEND:", data);

    setAnimationType("success");
    setAnimationVisible(true);

    setTimeout(() => {
      setAnimationVisible(false);

      const updatedTicket = {
        ...ticket,
        estatus: ticket.estatus,
        idSitio: body.idSitio,
        idCategoria: body.tipoReporte,
        nombreSitio: sitioSeleccionado?.Nombre || ticket.nombreSitio,
        tipoReporte: categoriaSeleccionada?.nombreCategoria || ticket.tipoReporte,
        municipio: body.municipio,
        direccion: body.direccion,
        latitud: body.latitud,
        longitud: body.longitud,
        descripcion: body.descripcion
      };

      route.params?.onGoBack?.(updatedTicket);
      navigation.goBack();

    }, 2000);

  } catch (error) {
    console.error(error);
    setAnimationType("error");
    setAnimationVisible(true);
    setTimeout(() => {
      setAnimationVisible(false);
    }, 2000);
      }
};

  return (
    <LinearGradient colors={
          isDark
            ? ["#0F172A", "#1E293B"] 
            : ["#2176AE", "#c7ddf5ff"]
          } style={{ flex: 1 }}>
    
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >

    <View style={{ flex: 1, padding: 20, marginTop: 14, marginBottom: 12 }}>
      <View style={[stylesEdit.card, {backgroundColor: theme.background,}]}>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Icon name="ticket" size={20} style={{color: theme.text}} />
          <Text style={[stylesEdit.infoText, {color: theme.text, marginLeft: 4}]}>
            Editar Ticket 
          </Text>
        </View>
      </View>
        <Text style={[stylesEdit.infoText, {color: theme.text, textAlign: "center"}]}>
          #{ticket.idTicket}
        </Text>

      <View style={[stylesEdit.divider, {borderBottomColor: theme.subText}]} />

      <View style={{backgroundColor: isDark ? "#3b82f6" : "#4da9ffff", borderRadius: 10, justifyContent: "center", height: 60, marginBottom: 12}}>
        <View style={{flexDirection: "row"}}>
          <View style={{backgroundColor: isDark ? "#1b55b1ff" : "#7eb8ffff", borderRadius: 12, height: 36, width: 36, alignItems: "center", justifyContent: "center", marginLeft: 8, marginTop: 2}}>
          <Icon name="location" size={18} style={{color: theme.text}} />
          </View>
          <View style={{flexDirection: "column", marginLeft: 10}}>
            <Text style={[stylesEdit.infoText,{color: theme.text}]}> 
              Información General
            </Text>
            <Text style={{color: theme.text}}>
            Actualiza los datos del ticket
            </Text>
          </View>
        </View>
        
      </View>

    <Text style={[stylesEdit.infoText, {color: theme.text}]}>Sitio</Text>
        <TouchableOpacity
        style={stylesEdit.input}
        onPress={() => {
            setTipoLista("sitio");
            setModalVisible(true);
        }}
        >
      <View style={[stylesEdit.textArea, {flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: theme.background, }]} >
      <Text style={{color: theme.text}}>
        {sitioSeleccionado?.Nombre || ticket.nombreSitio || "Selecciona un sitio"}
      </Text>
      <Icon name="chevron-down" size={20} style={{color: theme.text}}></Icon>
      </View>

      </TouchableOpacity>

    <Text style={[stylesEdit.infoText, {color: theme.text}]}>Categoría</Text>
        <TouchableOpacity
        style={stylesEdit.input}
        onPress={() => {
            setTipoLista("categoria");
            setModalVisible(true);
        }}
        >
      <View style={[stylesEdit.textArea, {flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: theme.background}]} >
        <Text style={{color: theme.text}}>
            {categoriaSeleccionada?.nombreCategoria || "Selecciona una categoría"}
        </Text>
        <Icon name="chevron-down" size={20} style={{color: theme.text}}></Icon>
      </View>
        </TouchableOpacity>

    <Text style={[stylesEdit.infoText, {color: theme.text}]}>Municipio</Text>
    <TextInput
        value={municipio}
        onChangeText={setMunicipio}
        style={[stylesEdit.textArea, {flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: theme.background, color: theme.text}]} 
    />

    <Text style={[stylesEdit.infoText, {color: theme.text}]}>Dirección</Text>
    <TextInput
        value={direccion}
        onChangeText={setDireccion}
        style={[stylesEdit.textArea, {flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: theme.background, color: theme.text}]}  
    />
    
    
    <View style={{flexDirection: "row", gap: 10,}}>
      <View style={{flex: 1}}> 
    <Text style={[stylesEdit.infoText, {color: theme.text}]}>Latitud</Text>
    <TextInput
        value={latitud}
        onChangeText={setLatitud}
        keyboardType="numeric"
        style={[stylesEdit.textArea, {flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: theme.background, color: theme.text}]} 
    />
    </View>

    <View style={{flex: 1}}> 
    <Text style={[stylesEdit.infoText, {color: theme.text}]}>Longitud</Text>
    <TextInput
        value={longitud}
        onChangeText={setLongitud}
        keyboardType="numeric"
        style={[stylesEdit.textArea, {flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: theme.background, color: theme.text}]} 
    />
    </View>
    </View>

      <Text style={[stylesEdit.infoText, {color: theme.text}]}>Descripción</Text>
      <TextInput
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          color: theme.text,
          borderRadius: 8,
          padding: 10,
          marginTop: 5,
          marginBottom: 20,
          minHeight: 100,
          textAlignVertical: "top"
        }}
      />

      <Modal visible={modalVisible} animationType="slide">
  <View style={{ flex: 1, padding: 20 }}>

    <Text style={{ fontSize: 18, marginBottom: 10 }}>
      Selecciona un {tipoLista}
    </Text>

    <FlatList
      data={
        tipoLista === "sitio"
          ? sitios
          : categorias
      }
      keyExtractor={(item) =>
        tipoLista === "sitio"
          ? item.idSitio.toString()
          : item.idCategoria.toString()
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            padding: 15,
            borderBottomWidth: 1,
            borderColor: "#eee"
          }}
          onPress={() => {
            if (tipoLista === "sitio") {
              setSitioSeleccionado(item);
            } else {
              setCategoriaSeleccionada(item);
            }

            setModalVisible(false);
          }}
        >
          <Text>
            {tipoLista === "sitio"
              ? item.Nombre
              : item.nombreCategoria}
          </Text>
        </TouchableOpacity>
      )}
    />

    <TouchableOpacity
      onPress={() => setModalVisible(false)}
      style={{
        marginTop: 20,
        padding: 15,
        backgroundColor: "#ef4444",
        borderRadius: 10,
        alignItems: "center"
      }}
    >
      <Text style={{ color: "#fff" }}>Cerrar</Text>
    </TouchableOpacity>

  </View>
</Modal>

      <TouchableOpacity
        onPress={guardarCambios}
        style={{
          backgroundColor: "#3b82f6",
          padding: 15,
          borderRadius: 10,
          alignItems: "center"
        }}
      > 
        <View style={{flexDirection:"row", gap: 8}}>
        <Icon name="save" size={18} color="#fff"></Icon>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Guardar cambios
        </Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
     <Modal visible={animationVisible} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          
          <View style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 20,
            alignItems: "center"
          }}>

            <LottieView
              source={
                animationType === "success"
                  ? require("../assets/animations/success.json")
                  : require("../assets/animations/error.json")
              }
              autoPlay
              loop={false}
              style={{ width: 150, height: 150 }}
            />

            <Text style={{ marginTop: 10, fontWeight: "bold" }}>
              {animationType === "success"
                ? "Guardado correctamente"
                : "Ocurrió un error"}
            </Text>

          </View>
        </View>
        </Modal>
    </LinearGradient>
  );
}
