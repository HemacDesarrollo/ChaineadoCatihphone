import { useState } from "react";
import { Alert } from "react-native";
import { forgotPassword } from "../api/authService";

export default function useRecuperarPasswordViewModel(){
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!email) {
            Alert.alert("Error", "Ingresa tu correo");
            return;
        }
        try {
            setLoading(true);
            const response = await forgotPassword(email);
            Alert.alert("Error", "No se pudo enviar el correo");
        } finally {
            setLoading(false);
        }
    };
    return {
        email,
        setEmail,
        handleSend,
        loading
    };
}