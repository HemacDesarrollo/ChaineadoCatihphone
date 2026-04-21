import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserAvatar from "./UserAvatar";
import { useRoute } from "@react-navigation/native";

export default function BottomMenu({onOpenFilters}) {

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();

  const isActive = (screen) => route.name === screen;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      
      <TouchableOpacity
        style={[
          styles.button,
          isActive("Home") && styles.activeButton
              ]}
              onPress={() => navigation.navigate("Home")}
            >
        <Icon
          name="home-outline"
          size={20}
          color={isActive("Home") ? "#FFD700" : "#fff"}
        />
        <Text
          style={[
            styles.label,
            { color: isActive("Home") ? "#FFD700" : "#fff" }
          ]}
        >
          Inicio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isActive("MisTickets") && styles.activeButton
              ]}
              onPress={() => navigation.navigate("MisTickets")}
            >
        <Icon
          name="ticket-outline"
          size={20}
          color={isActive("MisTickets") ? "#FFD700" : "#fff"}
        />
        <Text
          style={[
            styles.label,
            { color: isActive("MisTickets") ? "#FFD700" : "#fff" }
          ]}
        >
          Tickets
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isActive("Recientes") && styles.activeButton
              ]}
              onPress={() => navigation.navigate("Recientes")}
            >
        <Icon
          name="time-outline"
          size={20}
          color={isActive("Recientes") ? "#FFD700" : "#fff"}
        />
        <Text
          style={[
            styles.label,
            { color: isActive("Recientes") ? "#FFD700" : "#fff" }
          ]}
        >
          Recientes
        </Text>
      </TouchableOpacity>

       <TouchableOpacity
        style={[
          styles.button,
          isActive("Sitios") && styles.activeButton
              ]}
              onPress={() => navigation.navigate("Sitios")}
            >
        <Icon
          name="location"
          size={20}
          color={isActive("Sitios") ? "#FFD700" : "#fff"}
        />
        <Text
          style={[
            styles.label,
            { color: isActive("Sitios") ? "#FFD700" : "#fff" }
          ]}
        >
          Sitios
        </Text>
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
activeButton: {
  borderTopWidth: 3,
  borderTopColor: "#FFD700",
}

});