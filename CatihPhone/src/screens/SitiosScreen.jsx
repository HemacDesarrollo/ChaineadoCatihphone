import React, { useEffect, useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useTheme } from "../theme/ThemeContext";
import AppHeader from "../components/AppHeader";
import BottomMenu from "../components/BottonMenu";
import styles from "../styles/sitiosStyles.js";
import FiltrosSitios from "../components/FiltrosSitios.js";
import { api } from "../api/connect.js";
import { guardarSitioReciente } from "../utils/sitiosStorage.js";

import { useSitiosViewModel } from "../viewmodels/useSitiosViewModel";

export default function SitiosScreen() {
  const { theme, isDark } = useTheme();
  const vm = useSitiosViewModel();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [sitios, setSitios] = useState([]);
  const [modalFiltros, setModalFiltros] = useState(false);
 const [filtrosAplicados, setFiltrosAplicados] = useState({
  proyecto: [],
  estado: [],
  municipio: [],
  sitio: [],
  fechaInicio: null,
  fechaFin: null
});

  const proyectos = [
  ...new Set((vm.sitios || []).map(s => s.nombreProyecto).filter(Boolean))
];

const aplicarFiltros = (filtros) => {
  setFiltrosAplicados((prev) => ({
    proyecto: [],
    estado: [],
    municipio: [],
    sitio: [],
    fechaInicio: null,
    fechaFin: null,
    ...filtros
  }));
};

  if (vm.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1B4F8A" />
      </View>
    );
  }

  // console.log("FILTROS APLICADOS:", filtrosAplicados);
const sitiosFiltrados = (vm.sitios || []).filter((sitio) => {
  const search = vm.search?.toLowerCase().trim() || "";

  const id = sitio.idSitio?.toString() || "";
  const nombre = sitio.Nombre?.toLowerCase() || "";

  const matchSearch =
    !search ||
    (/^\d+$/.test(search) && id.startsWith(search)) ||
    nombre.includes(search);

 const matchEstado =
  !filtrosAplicados.estado ||
  filtrosAplicados.estado?.length === 0 ||
  filtrosAplicados.estado?.includes(sitio.Estado);

const matchMunicipio =
  !filtrosAplicados.municipio ||
  filtrosAplicados.municipio?.length === 0 ||
  filtrosAplicados.municipio?.includes(sitio.Municipio);

  const matchProyecto =
  !filtrosAplicados.proyecto ||
  filtrosAplicados.proyecto?.length === 0 ||
  filtrosAplicados.proyecto?.includes(sitio.nombreProyecto);

    const matchSitio =
  !filtrosAplicados.sitio ||
  filtrosAplicados.sitio?.length === 0 ||
  filtrosAplicados.sitio?.includes(sitio.Nombre);

const matchFecha =
  (!filtrosAplicados.fechaInicio || sitio.Fecha_Registro >= filtrosAplicados.fechaInicio) &&
  (!filtrosAplicados.fechaFin || sitio.Fecha_Registro <= filtrosAplicados.fechaFin);

  return matchSearch && matchEstado && matchMunicipio && matchProyecto && matchSitio && matchFecha;
});
  const renderItem = ({ item }) => {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.card,
        {
          borderLeftColor: "#2176AE",
          borderColor: "#2176AE",
          borderLeftWidth: 10,
          backgroundColor: theme.card,
          borderWidth: 1,
        },
      ]}
      onPress={() =>{
        guardarSitioReciente(item);
        navigation.navigate("DetalleSitios", { sitio: item })
      }}
    >
      <View style={{
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#2176AE",
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
      }}>
        <Text style={{ color: "#fff", fontSize: 14 }}>
          #{item.idSitio}
        </Text>
      </View>

      <Text style={[styles.codigo, { color: theme.text, fontSize: 16 }]}>
        {item.Nombre}
      </Text>


      <View style={styles.infoRow}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="folder-outline" size={18} color={theme.icon} />
          <Text style={[styles.infoBien, { color: theme.text }]}>
            {" "} {item.nombreProyecto || "Sin proyecto"}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="business" size={18} color={theme.icon} />
          <Text style={[styles.infoBien, { color: theme.text }]}>
            {" "} {item.Municipio || "Sin Municipio"}, {item.Estado || "Sin Estado"}
          </Text>
        </View>
      </View>

      <View style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.subText,
        marginVertical: 8,
        opacity: 0.3
      }} />

      <View style={styles.infoRow}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="location-outline" size={18} color={theme.icon} />
          <Text style={[styles.infoBase, { color: theme.text, marginLeft: 8, flex: 1}]}>
            {item.Direccion || "Sin dirección"}
          </Text>
        </View>
      </View>

    </TouchableOpacity>
  );
};

  return (
    <LinearGradient
      colors={
        isDark
          ? ["#0F172A", "#1E293B"]
          : ["#2176AE", "#c7ddf5ff"]
      }
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={styles.container}>

        <AppHeader title="Sitios" />

        <View style={styles.margen}>

          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#555" />

            <TextInput
              placeholder="Buscar sitio o código"
              placeholderTextColor={theme.subText}
              style={styles.input}
              value={vm.search}
              onChangeText={(text) => {
              vm.setSearch(text);
            }}
            />

            <TouchableOpacity onPress={() => vm.setSearch("")}>
              <Icon name="close-circle" size={20} color="red" />
            </TouchableOpacity>
          </View>

          <View style={styles.TextResul}>
            <View style={[styles.infoRow, {justifyContent: "space-between"}]}>
              <TouchableOpacity onPress={() => setModalFiltros(true)}>
              <View style={{flexDirection: "row"}}>  
                <Icon
                    name="filter-outline"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={[styles.listTitle]}>Filtrar</Text>
              </View>
              </TouchableOpacity>
                  
                <Text style={[styles.listTitle]}>
                  Mostrando {sitiosFiltrados.length} sitios
                </Text>
            </View>
          </View>

          <FlatList
            data={sitiosFiltrados}
            keyExtractor={(item) => item.idSitio.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 50 }}>
              
              <LottieView
                source={require("../assets/animations/sinResultados.json")}
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
              />

              <Text style={{ color: "#fff", marginTop: 10 }}>
                No se encontraron sitios
              </Text>

            </View>
            }
          />
          </View>
        <BottomMenu />
        <FiltrosSitios
          visible={modalFiltros}
          onClose={() => setModalFiltros(false)}
          aplicarFiltros={aplicarFiltros}
          sitios={vm.sitios}
          proyectos={proyectos}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}