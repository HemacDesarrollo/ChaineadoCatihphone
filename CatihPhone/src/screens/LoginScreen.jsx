import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/catihLogo.png";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../styles/theme/colors";


export default function LoginScreen() {
  const scheme = useColorScheme();

  
  const theme = scheme === "dark" ?   darkTheme : lightTheme ;

  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const scale = useRef(new Animated.Value(1)).current


useEffect(() => {
  Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
}, []);

  const handleLogin = () => {
    setUser({ name: "Miguel", email });
  };

  return (
    
  <LinearGradient colors={["#0076A7", "#003B5C"]} style={{flex:1}}>
  <SafeAreaView style={{ flex: 1}}>
  <StatusBar
  translucent
  backgroundColor="transparent"   
  barStyle={scheme === "dark" ? "light-content" : "dark-content"}
  />
  <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
  <View style={[styles.container,]}>
  <View style={styles.logoContainer}>

     <Text style={[styles.logoText, { color: theme.text }]}>
      CATIHPHONE
    </Text>
  </View>
    
    <Animated.View style={{ transform: [{ scale }] }}>
  <View
    style={[styles.logoWrapper,{ backgroundColor: theme.card}]}
  >
    <Image source={logo} style={styles.logoImage} />
  </View>
</Animated.View>


   


 
      <Text style={[styles.title, {color: theme.text}]}>Iniciar sesión</Text>
      {/*<Text style={[styles.subtitle, {color: theme.text}]}>
        Ingresa tu usuario y contraseña
      </Text>*/}

      
      <View style={[styles.inputContainer,{backgroundColor: theme.card, borderColor: theme.border}]}>
        <Ionicons name="person-circle-outline" size={22} color="#aaa" />
        <TextInput
          avoidKeyboard
          placeholder="Usuario"
          placeholderTextColor="#aaa"
          style={[styles.input, { color: theme.textColor}]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

  
      <View style={[styles.inputContainer, {backgroundColor: theme.card, borderColor: theme.border}]}>
        <Ionicons name="lock-closed-outline" size={22} color="#aaa" />
        <TextInput
          avoidKeyboard
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          style={[styles.input, { color: theme.textColor}]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secure}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>
    

   
      <TouchableOpacity style={[styles.button, {backgroundColor: theme.primary}]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

    
      <TouchableOpacity>
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
    paddingBottom: 24,
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
    paddingVertical: 6,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#0F172A",
    marginTop: 10,
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
