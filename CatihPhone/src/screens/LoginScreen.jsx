import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
  useColorScheme
} from "react-native";
import { lightTheme, darkTheme } from "../styles/theme/colors";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import logo from "../assets/catihLogo.png";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/authService";
import {
  saveCredentials,
  getCredentials,
  canUseBiometrics,
  authenticateBiometric,
} from "../utils/secureAuth";


export default function LoginScreen() {

 const scheme = useColorScheme();
  const theme = scheme === "dark" ? darkTheme : lightTheme;

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);

  const tipoUsuariosPermitidos = {
    Proveedor_app: true,
    Admin_app: true,
    Cliente: true,
    visor: true,
  };

  console.log("LOGIN FUNC:", login);

  const handleLogin = async () => {
  if (!usuario.trim())
    return Alert.alert("Error", "Completa el usuario");
    

  if (!password.trim())
    return Alert.alert("Error", "Completa la contraseña");

  setLoading(true);

  try {
    const res = await login(usuario, password);

    console.log("RESPUESTA LOGIN:", res);
    console.log("TOKEN RECIBIDO:", res?.token);

    if (!res)
      return Alert.alert("Error", "Respuesta inválida");

    setUser(res);
    await saveCredentials(usuario, password);

  } catch (err) {
    console.log("ERROR LOGIN", err.response?.data || err.message);
    Alert.alert("Error", "Usuario o contraseña incorrectos");
  } finally {
    setLoading(false);
  }
};


  const checkBiometricLogin = async () => {
    const canUse = await canUseBiometrics();
    if (!canUse) return;

    const { user, pass } = await getCredentials();
    if (!user || !pass) return;

    const biometric = await authenticateBiometric();
    if (!biometric.success) return;

    try {
      const res = await login(user, pass);
      if (res && res !== "Failure") {
        setUser(res);
      }
    } catch (err) {
      console.log("ERROR BIOMÉTRICO", err);
    }
  };

  useEffect(() => {
    checkBiometricLogin();
  }, []);

  return (
    <LinearGradient colors={["#0076A7", "#003B5C"]} style={{flex:1}}>
  <SafeAreaView style={{ flex: 1}}>
  <StatusBar
  translucent
  backgroundColor="transparent"   
  barStyle={scheme === "dark" ? "light-content" : "dark-content"}
  />
  <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View style={styles.container}>
    <View style={styles.logoContainer}>
    <Text style={[styles.logoText, { color: theme.text }]}>CATIHPHONE</Text>

    <Animated.View style={{ transform: [{ scale: 1 }] }}>
    <View style={[styles.logoWrapper, { backgroundColor: theme.card}]}>
    <Image source={logo} style={styles.logoImage} />
    </View>
    </Animated.View>
    </View>

      <Text style={[styles.title, {color: theme.text, marginTop: 12}]}>Iniciar sesión</Text>
    
      <View style={[styles.inputContainer,{backgroundColor: theme.card, borderColor: theme.border, marginTop: 16}]}>
        <Ionicons name="person-outline" size={22} color="#aaa" />
        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#aaa"
          style={[styles.input, { color: theme.textColor}]}
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />
      </View>

    
      <View style={[styles.inputContainer, {backgroundColor: theme.card, borderColor: theme.border}]}>
        <Ionicons name="lock-closed-outline" size={22} color="#aaa" />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          style={[styles.input, { color: theme.textColor}]}
          secureTextEntry={secure}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>
    
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Cargando..." : "Ingresar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={checkBiometricLogin}>
        <Text style={[styles.link, {color: theme.text}]}>Iniciar con huella digital</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={[styles.link, styles.linkOrange]}>
          Olvidé mi contraseña
        </Text>
      </TouchableOpacity>
     
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    paddingBottom: 16,
  },

  logoContainer: {
  alignItems: "center",
  marginBottom: 30,
},

logoWrapper: {
 width: 150,
  height: 150,
  borderRadius: 150,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 12,
  marginLeft: 95,
  marginRight: 100,
  marginTop: 40,
  
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 8, 
},

logoImage: {
  width: 150,
  height: 150,
  resizeMode: "contain",
  borderRadius: 120,
  marginRight: 100,
  marginLeft: 95,
},

logoText: {
  fontSize: 28,
  fontWeight: "bold",
  letterSpacing: 2,
},


  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    marginVertical:10,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 15,
    marginVertical: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 14,
    margin: 6,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#0F172A",
    marginTop: 6,
    borderRadius: 150
  },

  button: {
    backgroundColor: "#2563EB",
    borderRadius: 30,
    paddingVertical: 16,
    marginTop: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },

  link: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },

  linkOrange: {
    color: "#22C55E",
    fontWeight: "600",
  },
});
