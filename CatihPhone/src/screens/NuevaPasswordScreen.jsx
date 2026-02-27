import React, { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigation, useRoute } from "@react-navigation/native";
import { resetPassword } from "../api/authService";

export default function NuevaPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute(); 
 
  const { token } = route.params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      const response = await resetPassword(token, password);
      Alert.alert("Éxito", response.message, [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Error al cambiar la contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#0076A7","#003B5C"]} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 10, textAlign: "center" }}>
          Nueva Contraseña
        </Text>
        <Text style={{ color: "#fff", textAlign: "center", marginBottom: 30 }}>
          Ingresa tu nueva contraseña
        </Text>

        <InputField
          icon="lock-closed-outline"
          placeholder="Nueva contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <InputField
          icon="lock-closed-outline"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <ButtonPrimary title={loading ? "Cambiando..." : "Cambiar contraseña"} onPress={handleReset} />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: "#22C55E", textAlign: "center", marginTop: 20 }}>
            Volver al inicio de sesión
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
