import React, {useState} from "react";
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigation } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../styles/theme/colors";
import { forgotPassword } from "../api/authService";



export default function RecuperarPasswordScreen() {
   

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!email) {
            Alert.alert("Error", "Ingresa tu correo");
            return;
        }
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Ingresa un correo válido");
            return;
        } try {
            setLoading(true);

            const response = await forgotPassword(email);

            Alert.alert("Exito", response.message);
        } catch (error) {
            Alert.alert(
                "Error",
                error?.response?.data?.message || "Error al enviar ele correo"
            );
        } finally {
            setLoading(false);
        }
    };
        return (
            <LinearGradient colors={["#0076A7","#003B5C"]} style={{flex:1}}>
                <StatusBar barStyle={"light-content"}/>
                <SafeAreaView style={{flex: 1, justifyContent:"center", padding: 24}}>
                    <Text style={{fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 10, textAlign: "center"}}>
                        Recuperar Contraseña
                    </Text>
                    <Text style={{color: "#fff", textAlign: "center", marginBottom: 30}}>
                        Ingresa tu correo electrónico por favor
                    </Text>
                    <InputField icon="mail-outline" placeholder="Correo electrónico" value={email} onChangeText={setEmail}/>
                    <ButtonPrimary title={loading ? "enviando..." : "Enviar"} onPress={handleSend}/>
                    
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{color: "#22C55E", textAlign: "center", marginTop: 20, textDecorationLine: ""}}>
                            Volver al inicio de sesión
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        );
    }
