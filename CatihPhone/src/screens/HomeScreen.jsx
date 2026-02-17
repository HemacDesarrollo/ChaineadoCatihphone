import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
import { api } from "../api/connect";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const testToken = async () => {
      try {
        const response = await api.get("/APP/auth/test", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        console.log("RESPUESTA BACKEND:", response.data);
      } catch (error) {
        console.log("ERROR TOKEN:", error.response?.data || error.message);
      }
    };

    if (user?.token) {
      testToken();
    }
  }, []);

  return (
    <LinearGradient
      colors={["#0076A7", "#003B5C"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>CATIPHONE</Text>
        <Text style={styles.subtitle}>Bienvenido</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("PuntosConexion")}
        >
          <Icon name="ticket-outline" size={60} color="#000" />
          <Text style={styles.cardText}>Ver Tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Inventario")}
        >
          <Icon name="cube-outline" size={60} color="#000" />
          <Text style={styles.cardText}>Inventario</Text>
        </TouchableOpacity>

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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 40,
  },
  card: {
    width: "100%",
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: "center",
    marginBottom: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "500",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#E5E5E5",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 40,
    elevation: 5,
  },
  backText: {
    fontSize: 18,
  },
});
