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
        <Icon name="home-outline" size={20} color="#fff" />
        <Text style={styles.label}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MisTickets")}
      >
        <Icon name="ticket-outline" size={20} color="#fff" />
        <Text style={[styles.label,{textAlign: "center"}]}>Mis {"\n"}Tickets</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Recientes")}
      >
        <Icon name="time-outline" size={20} color="#fff" />
        <Text style={styles.label}>Recientes</Text>
      </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Sitios")}
      >
        <Icon name="location" size={20} color="#fff" />
        <Text style={styles.label}>Sitios</Text>
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
    backgroundColor: "#1B4F8A",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
    borderColor: "#003B5C",
    paddingVertical: 10
  },

  button: {
    alignItems: "center",
    justifyContent:"center",
    flex: 1,
    height: 60,
    justifyContent: "space-between",
    paddingVertical: 6
  },
  label: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    textAlign: "center",
    lineHeight: 14,
    height: 28,
  },
  ContenedorAvatar: {
  width: 25,
  height: 25,
  borderRadius: 15,
  overflow: "hidden",
  backgroundColor: "#fff"
},

});