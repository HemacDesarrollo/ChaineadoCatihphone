import { useState, useContext } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function useUserMenuViewModel(){
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const {logout} = useContext(AuthContext);

    const abrirMenu = () => setVisible(true);
    const cerrarMenu = () => setVisible(false);

    const irPerfil = () => {
        cerrarMenu();
        navigation.navigate("ProfileScreen");
    };

    const irCambiarPassword = () => {
        cerrarMenu();
        navigation.navigate("ChangePasswordScreen");
    };

    const cerrarSesion = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Seguro que deseas salir",
            [
                {text: "Cancelar", style: "cancel"},
                {text: "Salir", onPress: logout}
            ]
        );
    };

    return {
        visible,
        abrirMenu,
        cerrarMenu,
        irPerfil,
        irCambiarPassword,
        cerrarSesion,
    };
}