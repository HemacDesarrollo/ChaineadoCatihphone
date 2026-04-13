import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  StatusBar,
  Modal,
  ActivityIndicator,
} from "react-native";

import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import FiltrosTicketsModal from "../components/FiltrosTicketsModal";
import AppHeader from "../components/AppHeader.js";
import { useTheme } from "../theme/ThemeContext.js";
import styles from "../styles/theme/ticketsStyles";
import UserMenuModal from "../components/userMenuModals";
import BottomMenu from "../components/BottonMenu";

import usePuntosConexionViewModel from "../viewmodels/useMisTicketsViewModel";
import useUserMenuViewModel from "../viewmodels/useUserMenuViewModel";
import { api } from "../api/connect";
import { AuthContext } from "../context/AuthContext";
import STATUS_COLORS from "../utils/ColorsEstatus";

export default function PuntosConexionScreen() {
  const {theme, isDark} = useTheme();
  const vm = usePuntosConexionViewModel();
  const {setFiltrosTickets} = useContext(AuthContext);
  useEffect(() => {

  async function cargarCategorias() {

    try {

      const response = await api.get("/APP/tickets/categorias");

      vm.setCategorias?.(response.data);

    } catch (error) {

      //console.log("ERROR CARGANDO CATEGORIAS:", error);

    }


  }

  cargarCategorias();

}, []);
  const userMenu = useUserMenuViewModel();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [modalFiltros, setModalFiltros] = useState(false);


  const [filtrosAplicados, setFiltrosAplicados] = useState({
  estatus: [],
  categoria: [],
  empresa: [],
  tipoProblema: [],
  estado: [],
  municipio: [],
  nombreProyecto: [],
  numContrato: [],
  fechaRegistroProyecto: [],
  fechaFinProyecto: [],
});

 const aplicarFiltros = (filtros) => {
  const esReset = Object.keys(filtros).length === 0;

  if(esReset) {
    setFiltrosAplicados({
      estatus: [],
      categoria: [],
      empresa: [],
      tipoProblema: [],
      estado: [],
      municipio: [],
      nombreProyecto: [],
      numContrato: [],
      fechaRegistroProyecto: [],
      fechaFinProyecto: [],
    });
      setFiltrosTickets({});
    vm.aplicarFiltrosAvanzados(null);
    return;
  }
     setFiltrosAplicados({
    estatus: filtros.estatus || [],
    categoria: filtros.idCategoria || [],
    empresa: filtros.idEmpresa || [],
    tipoProblema: filtros.tipoProblema || [],
    estado: filtros.estado || [],
    municipio: filtros.municipio || [],
    nombreProyecto: filtros.nombreProyecto || [],
    numContrato: filtros.numContrato || [],
    fechaRegistroProyecto: filtros.fechaRegistroProyecto || [],
    fechaFinProyecto: filtros.fechaFinProyecto || [],
    });

  vm.aplicarFiltrosAvanzados(filtros);
  console.log("FILTROS ENVIADOS:", filtros);
};

  const insets = useSafeAreaInsets();
  const route = useRoute();

  const tickets = vm.tickets || [];
  const [modalFiltroEstado, setModalFiltroEstado] = useState(false);

  useEffect(() => {
    if (route.params?.menu) {
      vm.handleMenuPress(route.params.menu);
    }
  }, [route.params]);

  const renderItem = ({ item }) => {
    const statusColor =
      STATUS_COLORS[item.estatus?.toUpperCase()] || "#6b7280";

    const STATUS_BACKGROUND = {
      CREADO: "#3b82f6",
      ASIGNADO: "#6366f1",
      "EN PROCESO": "#f59e0b",
      PAUSADO: "#cabd0aff",
      CERRADO: "#6b7280",
      COTIZACION: "#a855f7",
      RESUELTO: "#16a34a",
    };


    const statusbackground =
      STATUS_BACKGROUND[item.estatus?.toUpperCase()] || "#F8FAFC";

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { borderLeftColor: statusColor, borderColor: statusbackground, backgroundColor: theme.card, borderWidth: 1, borderLeftWidth: 10 },
        ]}
        activeOpacity={0.85}
        onPress={()=>
          navigation.navigate("DetalleTicket", {ticket: item})
        }
      >
        <View style={[styles.estadoBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.estadoAbierto}>{item.estatus}</Text>
        </View>

        <Text style={[styles.codigo, { color: theme.text }]}>#HE-{item.id_label}</Text>

        <View style={styles.infoRow}>
          {/*<Text style={styles.info}>Tipo de Reporte:</Text>*/}
          <View style={styles.infoValueContainer}>
            <Text style={[styles.infoBase ,{fontWeight: "bold", color: theme.text}]}>{item.tipoReporte}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          {/* <Text style={styles.info}>Proyecto:</Text> */}
          <View style={[styles.infoValueContainer,{flexDirection: "row"}]}>
            <Icon name="folder-open" size={18}  color={theme.icon}/>
            <Text style={[styles.infoBien, { color: theme.text }]}> {item.nombreProyecto}</Text>
          </View>
        </View> 

        <View style={styles.infoRow}>
          {/* <Text style={styles.info}>Sitio:</Text> */}
          <View style={[styles.infoValueContainer,{flexDirection: "row"}]}>
            <Icon name="location-outline" size={18}  color={theme.icon}/>
            <Text style={[styles.infoBien, { color: theme.text }]}> {item.nombreSitio}</Text>
          </View>
        </View>

        <View style={[styles.linea,{ borderBottomColor: theme.subText }]} />

        <View style={styles.infoRow}>
          {/* <Text style={styles.info}>Asignado a:</Text> */}
          <View style={[styles.infoValueContainer,{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}]}>
            <View style={{flexDirection: "row", alignContent:"center"}}>
              <Icon name="person" size={18} color={theme.icon}/>
              <Text style={[styles.infoBase, { color: theme.text }]}> {item.usuario_atiende}</Text>
            </View>
            <Text style={[styles.infoBase, { color: theme.text }]}>{new Date(item.fechaCreacion.replace(' ', 'T')).toLocaleDateString('es-MX', {day: '2-digit', month: '2-digit', year: 'numeric'})}</Text>
          </View>
        </View>

        {/* <View style={styles.infoRow}>
          <Text style={styles.info}>Fecha Creación:</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoBase}>{item.fechaCreacion}</Text>
          </View>
        </View> */}
      </TouchableOpacity>
    );
  };


const ticketsFiltrados = Array.isArray(vm.tickets)
  ? vm.tickets.filter((ticket) => {

      const search = vm.search?.toLowerCase().trim() || "";

      const idLabel = ticket.id_label?.toString().toLowerCase() || "";
      const codigo = `he-${ticket.id_label}`; 

      const esBusquedaCodigo = /^he-\d+$/.test(search);

      const coincideBusqueda =
        search === "" ||

        (/^\d+$/.test(search) && idLabel.startsWith(search)) ||

        (esBusquedaCodigo && codigo.startsWith(search));

      return coincideBusqueda;
    })
  : [];
  return (
    <LinearGradient colors={
    isDark
      ? ["#0F172A", "#1E293B"]
      : ["#2176AE", "#c7ddf5ff"]
  } style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={styles.container}>
    
        <AppHeader title={vm.headerConfig.title}/>

        <View style={styles.margen}>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#555" />

            <TextInput
              placeholder="Buscar por ID o Titulo"
              placeholderTextColor= {theme.subText}
              style={[styles.input]}
              value={vm.search}
              onChangeText={vm.setSearch}
            />

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => vm.setSearch("")}
            >
              <Icon name="close-circle" size={20} color="rgba(192,21,21,1)" />
            </TouchableOpacity>
          </View>

          <View style={styles.TextResul}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "flex-start" }}
              onPress={() => {

                if (!vm.empresas || vm.empresas.length === 0) {
                  vm.cargarEmpresas();
                }

                setModalFiltros(true);
              }}
            >
              <Icon
                name="filter-outline"
                size={20}
                color="#fff"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.listTitle}>Filtrar</Text>
            </TouchableOpacity>

            <Text style={styles.listTitle}>
              Mostrando {ticketsFiltrados.length || tickets.length} / {vm.totalTickets} tickets
            </Text>
          </View>

          <FlatList
            data={vm.tickets}
            keyExtractor={(item, index) =>
              `${item.idTicket || item.id}-${index}`
            }
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            onEndReached={
              vm.esTicket && ticketsFiltrados.length > 0
                ? vm.cargarMasTickets
                : null
            }
            onEndReachedThreshold={0.3}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              (!vm.loadingMore && ticketsFiltrados.length === 0) ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 50,
                  }}
                >

                  <LottieView
                    source={require("../assets/animations/sinResultados.json")}
                    autoPlay
                    loop
                    style={{ width: 200, height: 200 }}
                  />

      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          color: "#fff",
          textAlign: "center"
        }}
      >
        No se encontraron resultados
      </Text>

    </View>
  ) : null
}
            ListFooterComponent={
              vm.loadingMore ? (
                <ActivityIndicator size="small" color="#0076A7" />
              ) : null
            }
          />

          <View style={{ paddingBottom: insets.bottom }} />
        </View>

        <BottomMenu />
      </SafeAreaView>

      <UserMenuModal
        visible={userMenu.visible}
        onClose={userMenu.cerrarMenu}
        onPerfil={userMenu.irPerfil}
        onPassword={userMenu.irCambiarPassword}
        onLogout={userMenu.cerrarSesion}
      />
      <FiltrosTicketsModal
        visible={modalFiltros}
        onClose={() => setModalFiltros(false)}
        aplicarFiltros={aplicarFiltros}
        estados={vm.filtroMostrar}
        categorias= {vm.categorias}
        empresas= {vm.empresas}
        sitios= {vm.sitios}
        estadosGeo={vm.estadosUnicos}
        municipios={vm.municipios}
        onSelectEstado={vm.seleccionarEstado}
        onSelectMunicipio={vm.seleccionarMunicipio}
        proyectosFiltros={vm.proyectosFiltros}
        tipoProblemaFiltros={vm.tipoProblemaFiltros}
      />
    </LinearGradient>
  );
}