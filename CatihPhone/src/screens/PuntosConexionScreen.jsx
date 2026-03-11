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

import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

import styles from "../styles/theme/puntosStyles";
import UserMenuModal from "../components/userMenuModals";
import BottomMenu from "../components/BottonMenu";

import usePuntosConexionViewModel from "../viewmodels/usePuntosConexionViewModel";
import useUserMenuViewModel from "../viewmodels/useUserMenuViewModel";

import { AuthContext } from "../context/AuthContext";
import STATUS_COLORS from "../utils/ColorsEstatus";

export default function PuntosConexionScreen() {
  const vm = usePuntosConexionViewModel();
  const userMenu = useUserMenuViewModel();
  const { user } = useContext(AuthContext);

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
      CREADO: "#DBEAFE",
      ASIGNADO: "#cad3fcff",
      "EN PROCESO": "#fae6c4ff",
      PAUSADO: "#f5ef98ff",
      CERRADO: "#F3F4F6",
      COTIZACION: "#F3E8FF",
      RESUELTO: "#DCFCE7",
    };

    const statusbackground =
      STATUS_BACKGROUND[item.estatus?.toUpperCase()] || "#F8FAFC";

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { borderLeftColor: statusColor, backgroundColor: statusbackground },
        ]}
        activeOpacity={0.85}
      >
        <View style={[styles.estadoBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.estadoAbierto}>{item.estatus}</Text>
        </View>

        <Text style={styles.codigo}>#HE-{item.id_label}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.info}>Tipo de Reporte:</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoBase}>{item.tipoReporte}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.info}>Proyecto:</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoBase}>{item.nombreProyecto}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.info}>Sitio:</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoBase}>{item.nombreSitio}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.info}>Asignado a:</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoBase}>{item.usuario_atiende}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.info}>Fecha Creación:</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoBase}>{item.fechaCreacion}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ticketsFiltrados = Array.isArray(vm.tickets)
  ? vm.tickets.filter((ticket) => {
      const search = vm.search?.toLowerCase().trim() || "";

      const texto = search
        .replace("#", "")
        .replace("#h", "")
        .replace("h", "")
        .replace("he-", "")
        .replace("he", "");

      const idLabel = ticket.id_label?.toString().toLowerCase() || "";

      const codigo = `#he-${ticket.id_label}`.toLowerCase();
      const codigoSinHash = codigo.replace("#", "");

      const coincideBusqueda =
        search === "" ||
        (/^\d+$/.test(search) && idLabel.startsWith(search)) ||
        codigo.startsWith(search) ||
        codigoSinHash.startsWith(search);

      const coincideEstado =
        !vm.filtroEstado ||
        vm.filtroEstado === "Todos" ||
        ticket.estatus?.toUpperCase() === vm.filtroEstado?.toUpperCase();

      return coincideBusqueda && coincideEstado;
    })
  : [];

  return (
    <LinearGradient colors={["#0076A7", "#003B5C"]} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <View style={styles.iconCard}>
            <Icon name={vm.headerConfig.icon} size={35} color="#000" />
          </View>

          <Text style={[styles.headerTitle, { width: 100 }]}>
            {vm.headerConfig.title}
          </Text>

          <View style={styles.iconCards}>
            <Icon name="notifications" size={35} color="#000" />
          </View>
        </View>

        <View style={styles.margen}>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#555" />

            <TextInput
              placeholder="Buscar por ID o Titulo"
              placeholderTextColor="#777"
              style={styles.input}
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
              onPress={() => setModalFiltroEstado(true)}
            >
              <Icon
                name="filter-outline"
                size={20}
                color="#fff"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.listTitle}>Filtrar por</Text>
            </TouchableOpacity>

            <Text style={styles.listTitle}>
              Mostrando {tickets.length} / {vm.totalTickets} tickets
            </Text>
          </View>

          <FlatList
            data={ticketsFiltrados}
            keyExtractor={(item, index) =>
              `${item.idTicket || item.id}-${index}`
            }
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            onEndReached={
              vm.esTicket && !vm.search && ticketsFiltrados.length > 0
                ? vm.cargarMasTickets
                : null
            }
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !vm.loadingMore && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginTop: 50,
                    marginLeft: 30,
                  }}
                >
                  <Icon name="search-outline" size={40} color="#fff" />
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    No se encontraron resultados
                  </Text>
                </View>
              )
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

      <Modal transparent animationType="fade" visible={modalFiltroEstado}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalFiltroEstado(false)}
        >
          <TouchableOpacity style={styles.modalCard} activeOpacity={1}>
            <Text style={styles.modalTitle}>Filtrar por estado</Text>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                vm.aplicarFiltroEstado("Todos");
                setModalFiltroEstado(false);
              }}
            >
              <Text style={styles.modalOptionText}>Todos</Text>
            </TouchableOpacity>

            {vm.filtroMostrar.map((estado) => {
              const color = STATUS_COLORS[estado];

              return (
                <TouchableOpacity
                  key={estado}
                  style={styles.modalOption}
                  onPress={() => {
                    vm.aplicarFiltroEstado(estado);
                    setModalFiltroEstado(false);
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: color,
                      marginRight: 10,
                    }}
                  />

                  <Text style={styles.modalOptionText}>{estado}</Text>
                </TouchableOpacity>
              );
            })}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <UserMenuModal
        visible={userMenu.visible}
        onClose={userMenu.cerrarMenu}
        onPerfil={userMenu.irPerfil}
        onPassword={userMenu.irCambiarPassword}
        onLogout={userMenu.cerrarSesion}
      />
    </LinearGradient>
  );
}