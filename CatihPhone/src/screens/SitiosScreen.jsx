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

import { useTheme } from "../theme/ThemeContext";
import AppHeader from "../components/AppHeader";
import BottomMenu from "../components/BottonMenu";
import styles from "../styles/sitiosStyles.js";

import { useSitiosViewModel } from "../viewmodels/useSitiosViewModel";

export default function SitiosScreen() {
  const { theme, isDark } = useTheme();
  const vm = useSitiosViewModel();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [sitios, setSitios] = useState([]);

  if (vm.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1B4F8A" />
      </View>
    );
  }

  const sitiosFiltrados = (vm.sitios || []).filter((sitio) => {
  const search = vm.search?.toLowerCase() || "";

  return (
    sitio.Nombre?.toLowerCase().includes(search) ||
    sitio.Codigo?.toLowerCase().includes(search)
  );
});

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.card,
        {
          borderColor: "#fff",
          backgroundColor: theme.card,
          borderWidth: 1,
        },
      ]}
      onPress={() =>
        navigation.navigate("DetalleSitio", { sitio: item })
      }
    >
      <View style={[styles.codigo,{flexDirection: "row", justifyContent: "space-between"}]}>

        <View style={styles.infoRow}>
          <Text style={[styles.codigo, { color: theme.text }]}>
            {item.nombreProyecto}
          </Text>
        </View>

        <View>
        <Text style={[styles.codigo,{color: theme.text}]}>
          #{item.idSitio}
        </Text>
        </View>
        
      </View>

      {/* <View style={[styles.linea,{ borderBottomColor: theme.subText }]} /> */}

      <View style={styles.infoRow}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="location-outline" size={18} color={theme.icon} />
          <Text style={[styles.infoBien, { color: theme.text }]}>
            {" "} {item.Municipio || "---"}, {item.Estado || "---"}
          </Text>
        </View>
      </View>


      <View style={styles.infoRow}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="pricetag-outline" size={18} color={theme.icon} />
          <Text style={[styles.infoBase, { color: theme.text }]}>
            {" "} {item.Codigo || "---"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
              onChangeText={vm.setSearch}
            />

            <TouchableOpacity onPress={() => vm.setSearch("")}>
              <Icon name="close-circle" size={20} color="red" />
            </TouchableOpacity>
          </View>

          <View style={styles.TextResul}>
            <View style={[styles.infoRow, {justifyContent: "space-between"}]}>
              <View style={{flexDirection: "row"}}>  
                <Icon
                    name="filter-outline"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={[styles.listTitle]}>Filtrar</Text>
              </View>
                  
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
              <Text style={{ textAlign: "center", marginTop: 50, color: "#fff" }}>
                No se encontraron sitios
              </Text>
            }
          />

        </View>

        <BottomMenu />
      </SafeAreaView>
    </LinearGradient>
  );
}