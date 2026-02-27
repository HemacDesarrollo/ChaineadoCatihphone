import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, TextInput, StatusBar, Modal, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles/theme/puntosStyles";
import UserMenuModal from "../components/userMenuModals";
import usePuntosConexionViewModel from "../viewmodels/usePuntosConexionViewModel";
import useUserMenuViewModel from "../viewmodels/useUserMenuViewModel";
import { useAuth } from "../hooks/useAuth";


export default function PuntosConexionScreen() {

  const vm = usePuntosConexionViewModel();
  const userMenu = useUserMenuViewModel();
  const {user} = useAuth();

  const renderItem = ({ item }) => {
    if (vm.esTicket) {
      return (
        <TouchableOpacity style={styles.card}>
          <View style={[
            styles.estadoBadge,
            item.estadoTicket === "Abierto"
            ? styles.activo
            : styles.cerrado,
          ]}>
            <Text style={styles.estadoAbierto}>
              {item.estadoTicket}
            </Text>
          </View>
          <Text style={styles.codigo}>#{item.id}</Text>

          <Text style={styles.info}>Tipo de Reporte: (--)</Text>
          <Text style={styles.info}>Asignado a: (--)</Text>
          <Text style={styles.info}>Fecha de Creación: (--)</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.card}>
        <View style={[styles.estadoBadge, item.estado === "Activo" ? styles.activo : styles.pendiente,]}>
          <Text style={styles.estadoText}>
            {item.estado}
          </Text>
        </View>

        <Text style={styles.codigo}>#{item.id}</Text>
        
        <Text style={styles.info}>Total de Tickets: (--)</Text>
        <Text style={styles.info}>Tickets Pendientes: (--)</Text>
        <Text style={styles.info}>Nombre del inmueble: (--)</Text>
        <Text style={styles.info}>Temática: (--)</Text>
        <Text style={styles.info}>Clasificación: (--)</Text>
        <Text style={styles.info}>Municipio: (--)</Text>
      </TouchableOpacity>
    );
  };
  return (
    <LinearGradient
      colors={["#0076A7", "#003B5C"]}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconCard}>
            <Icon
              name={vm.headerConfig.icon}
              size={35}
              color="#000"
            />
          </View>

          <Text style={[styles.headerTitle, { width: 100 }]}>
            {vm.headerConfig.title}
          </Text>

          <View style={styles.iconCards}>
            <Icon name="notifications" size={35} color="#000" />
          </View>
          
          <View style={[styles.header, { width: 90 }]}>
            <View style={styles.iconCards}>
              <TouchableOpacity onPress={userMenu.abrirMenu}>
                <Icon name="person" size={35} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          
          

        </View>

        <View style={styles.margen}>
          <FlatList
            data={vm.dataMostrar}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
            ListHeaderComponent={
              <>
                <View style={styles.searchContainer}>
                  <Icon
                    name="search-outline"
                    size={20}
                    color="#555"
                  />
                  <TextInput
                    placeholder="Buscar por ID o Titulo"
                    placeholderTextColor="#777"
                    style={styles.input}
                    value={vm.search}
                    onChangeText={vm.setSearch}
                  />
                </View>

                <View style={styles.cardMenu}>
                  {[
                    { label: "Mis\nTickets", icon: "ticket-outline" },
                    { label: "Nuevo \nTicket", icon: "add-circle-outline" },
                    { label: "Puntos de\nConexión", icon: "wifi-outline" },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.label}
                      style={[
                        styles.MenuButton,
                        vm.menuSeleccionado === item.label &&
                          styles.menuActivo,
                      ]}
                      onPress={() =>
                        vm.handleMenuPress(item.label)
                      }
                    >
                      <View style={styles.buttonContent}>
                        <Icon
                          name={item.icon}
                          size={22}
                          color={
                            vm.menuSeleccionado === item.label
                              ? "#0076A7"
                              : "#FFFFFF"
                          }
                        />
                        <Text
                          style={[
                            styles.MenuText,
                            vm.menuSeleccionado === item.label &&
                              styles.menuTextActivo,
                          ]}
                        >
                          {item.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

             
                <View style={styles.filtroContainer}>
                  <Text style={styles.filtroLabel}>
                    Filtrar:
                  </Text>

                  {vm.filtroMostrar.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.filtroButton,
                        (vm.esTicket
                          ? vm.filtroTicket
                          : vm.filtroEstado) === item &&
                          styles.filtroActivo,
                      ]}
                      onPress={() =>
                        vm.esTicket
                          ? vm.setFiltroTicket(item)
                          : vm.setFiltroEstado(item)
                      }
                    >
                      <Text
                        style={[
                          styles.botonActivo,
                          (vm.esTicket
                            ? vm.filtroTicket
                            : vm.filtroEstado) === item &&
                            styles.filtroTextActivo,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.TextResul}>
                  <Text style={styles.listTitle}>
                    {vm.listTitle}
                  </Text>
                  <Text style={styles.listTitle}>
                    Mostrando {vm.dataMostrar.length} resultados
                  </Text>
                </View>
              </>
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Icon
                  name="search-outline"
                  size={45}
                  color="#999"
                />
                <Text style={styles.emptyTitle}>
                  {vm.esTicket
                    ? "No se encontraron tickets"
                    : "No se encontraron puntos de conexión"}
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>

      <Modal
        transparent
        animationType="fade"
        visible={vm.modalNuevoTicket}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={vm.cerrarModal}
        >
          <TouchableOpacity
            style={styles.modalCard}
            activeOpacity={1}
          >
            <Text style={styles.modalTitle}>
              Selecciona el Tipo de Ticket
            </Text>

            <TouchableOpacity style={styles.modalOption}>
              <Icon
                name="document-text-outline"
                size={24}
                color="#0076A7"
              />
              <Text style={styles.modalOptionText}>
                Ticket Solicitud
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption}>
              <Icon
                name="warning-outline"
                size={24}
                color="#0076A7"
              />
              <Text style={styles.modalOptionText}>
                Ticket Falla
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={vm.cerrarModal}
            >
              <Text style={styles.modalCancelText}>
                Cancelar
              </Text>
            </TouchableOpacity>
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


