import { StyleSheet } from "react-native";

const lottieStyles = StyleSheet.create ({
    posicion: {
        position: "absolute",
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: "rgba(0,0,0,0.5)", 
        justifyContent: "center", 
        alignItems: "center"
    },
    fondo: {
        width: 150, 
        height: 150, 
        backgroundColor: "transparent", 
        borderRadius: 20, 
        justifyContent: "center", 
        alignItems: "center"
    },

    tamaño: {
        width: 150, 
        height:150,
    }
})

export default lottieStyles;