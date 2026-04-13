import React, { useContext, useEffect } from "react";
import { View, Text, SafeAreaView, StatusBar,KeyboardAvoidingView, Platform, Image, useColorScheme, Animated, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme, darkTheme } from "../styles/theme/colors";
import logo from "../assets/imagen/catihLogo.png";
import LottieView from "lottie-react-native";
import styles from "../styles/theme/lottieStyles";
import { useTheme } from "../theme/ThemeContext";

import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import LinkText from "../components/LinkText";

import useLogin from "../viewmodels/useLoginViewModel";
import { AuthContext } from "../context/AuthContext";
import { Alert } from "react-native";

export default function LoginScreen(){
  const { theme, isDark } = useTheme();
  const scheme = useColorScheme();


  const {sesionExpired, setSesionExpired} =useContext(AuthContext)

  

  const {
    usuario,
    setUsuario,
    password,
    setPassword,
    loading,
    handleLogin,
    handleBiometricLogin,
    handleForgotPassword
  } = useLogin();

  useEffect (()=> {
    if(sesionExpired) {
      Alert.alert("Sesión expirada", "Por favor vuleve a iniciar sesión" );
      setSesionExpired(false);
    }
  }, [sesionExpired]);

  return (
    <LinearGradient colors={
      isDark
      ? ["#0F172A", "#1E293B"]
      : ["#2176AE", "#c7ddf5ff"]
      } style={{flex:1}}>
        <StatusBar
          translucent={false}
          backgroundColor="#003B5C"
          barStyle="light-content"/>
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS==="ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "center", padding: 6}} keyboardShouldPersistTaps= "handled" showsVerticalScrollIndicator={false}>
              <View style={{flex: 1, justifyContent: "center", padding: 24}}>
                <View style={{alignItems: "center", marginBottom: 35}}>
                  <Text style={[{
                    fontSize: 28, 
                    fontWeight:"bold", 
                    letterSpacing: 2, 
                    color: theme.text, 
                    textShadowColor: "rgba(117, 0, 252, 1)",
                    textShadowOffset: {width: 1, height: 1},
                    textShadowRadius: 4,}]}> 
                      CATIHPHONE 
                    </Text>
                    <Animated.View style={{transform: [{scale: 1}] }}>
                      <View style={{width: 150, height: 150, borderRadius: 150, justifyContent: "center", alignItems: "center", backgroundColor: theme.card, marginVertical: 20}}>
                        <Image source={logo} style={{width: 180, height: 180, resizeMode: "contain", borderRadius: 120, marginTop: 25}} />
                      </View>
                    </Animated.View>
                </View>
                <Text style={{
                  fontSize: 24, 
                  fontWeight: "700", 
                  textAlign: "center", 
                  color: theme.textTitle, 
                  marginVertical: 10,
                  textShadowColor: "rgba(13, 92, 211, 1)",
                  textShadowOffset: {width: 2, height: 2},
                  textShadowRadius: 4,
                  }}> 
                    Iniciar Sesión
                  </Text>

                <InputField icon="person-outline" placeholder="Usuario" value={usuario} onChangeText={setUsuario} theme={theme}></InputField>
                <InputField icon="lock-closed-outline" placeholder="Contraseña" value={password} onChangeText={setPassword} secure theme={theme}></InputField>

                <ButtonPrimary title="Ingresar" onPress={handleLogin} loading={loading}></ButtonPrimary>
                <TouchableOpacity onPress={handleBiometricLogin} padding>
                  <Text style={{ 
                    color: "#fff", 
                    fontSize: 14, 
                    textAlign: "center", 
                    marginTop: 5, 
                    textDecorationLine: "underline",
                    textShadowColor: "rgba(7, 6, 31, 1)",
                    textShadowOffset: {width: 2, height: 2},
                    textShadowRadius: 4,
                    }}>
                      Iniciar sesión con huella digital
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForgotPassword} padding>
                  <Text style={{ 
                    color: "#22C55E", 
                    fontSize: 14, 
                    textAlign: "center", 
                    marginTop: 15, 
                    textDecorationLine: "underline",
                    textShadowColor: "rgba(12, 10, 75, 1)",
                    textShadowOffset: {width: 1, height: 1},
                    textShadowRadius: 4, 
                    }}>
                      Olvide mi Contraseña
                  </Text>
                </TouchableOpacity>
               </View>
               </ScrollView>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
  
     {loading && (
      <View style={styles.posicion}>
        <View style={styles.fondo}>
          <LottieView source={require("../assets/animations/loader.json")} autoPlay loop style={styles.tamaño}/>
        </View>
      </View>
     )}
    </LinearGradient>
    
  );
}