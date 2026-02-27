import { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/authService";
import {
  canUseBiometrics,
  authenticateBiometric,
  getCredentials,
  saveCredentials
} from "../utils/secureAuth";
import { useNavigation } from "@react-navigation/native";


export default function useLogin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const navigation = useNavigation();

  const { loginUser, setSesionExpired } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, [])
  );

  const handleLogin = async () => {
    const response = await login(usuario, password);

console.log("LOGIN RESPONSE:", response);

if (!response?.token) {
  console.log("NO TOKEN RECEIVED");
  return Alert.alert("Error", "No se recibió token");
}

  if (!usuario.trim() || !password.trim()) {
    return Alert.alert("Error", "Completa usuario y contraseña");
  }

  try {
    setLoading(true);
    setSesionExpired(false);

    const response = await login(usuario, password);

    if (!response?.token) {
      return Alert.alert("Error", "No se recibió token");
    }


    await saveCredentials(usuario, password);

    await loginUser(response.token);

  } catch (err) {
    const status = err.response?.status;

    if (status === 401) {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    } else {
      Alert.alert("Error", "Error de conexión con el servidor");
    }
  } finally {
    setLoading(false);
  }
};


const handleBiometricLogin = async () => {
  console.log("BIOMETRIC START");

  const canUse = await canUseBiometrics();
  console.log("CAN USE:", canUse);

  const { user: savedUser, pass: savedPass } = await getCredentials();
  console.log("SAVED USER:", savedUser);
  console.log("SAVED PASS:", savedPass);

  if (!canUse) {
    console.log("NO BIOMETRICS AVAILABLE");
    return;
  }

  if (!savedUser || !savedPass) {
    console.log("NO SAVED CREDENTIALS");
    return;
  }

  console.log("CALLING AUTHENTICATE");

  const biometric = await authenticateBiometric();
  console.log("BIOMETRIC RESULT:", biometric);

  if (!biometric.success) return;

  try {
    setLoading(true);

    const response = await login(savedUser, savedPass);

    if (!response?.token) {
      throw new Error("Token inválido");
    }

    await loginUser(response.token);

  } catch (err) {
    Alert.alert("Error", "No se pudo iniciar sesión con biometría");
  } finally {
    setLoading(false);
  }
};


  const handleForgotPassword = () => {
    navigation.navigate("RecuperarPassword");
  };

  return {
    usuario,
    setUsuario,
    password,
    setPassword,
    loading,
    handleLogin,
    handleBiometricLogin,
    handleForgotPassword,
  };
}
