import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ButtonPrimary ({ title, onPress, loading}) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            disabled={loading}>
            <Text style = {styles.text}>{loading ? "cargando..." : title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    button: {
        backgroundColor: "#2563EB",
        borderRadius: 30,
        paddingVertical: 16,
        marginTop: 10,
        marginBottom: 20,
    },
    text: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
    },
})