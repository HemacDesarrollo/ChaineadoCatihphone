import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserAvatar from "./UserAvatar";

export default function BottomMenu({onOpenFilters}) {

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home-outline" size={26} color="#fff" />
        <Text style={styles.label}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PuntosConexion")}
      >
        <Icon name="location-outline" size={26} color="#fff" />
        <Text style={styles.label}>  Puntos {"\n"} Conexión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.ContenedorAvatar}>
            <UserAvatar />
        </View>

        <Text style={styles.label}>Perfil</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 110,
    backgroundColor: "#003B5C",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#003B5C"
  },

  button: {
    alignItems: "center"
  },
  label: {
    fontSize: 12,
    color: "#fff",
    marginTop: 2
  },
  ContenedorAvatar: {
  width: 40,
  height: 40,
  borderRadius: 50,
  overflow: "hidden",
  backgroundColor: "#fff"
},

});