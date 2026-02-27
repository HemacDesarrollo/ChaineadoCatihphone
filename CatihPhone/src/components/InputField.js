import React, {useState} from "react";
import {View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InputField({
    icon,
    placeholder,
    value,
    onChangeText,
    secure = false,
    theme = {card: "#fff", border: "#ccc", textColor: "#000"},
}) {
    const [show, setShow] = useState (!secure);

    return (
        <View style={[styles.container, {backgroundColor: theme.card, borderColor: theme.border}]}>
        <Ionicons name={icon} size={22} color="#aaa"/>
        <TextInput 
            style={[styles.input, {color: theme.textColor}]}
            placeholder={placeholder}
            placeholderTextColor ="#aaa"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secure && show}
        />
        {secure && (
            <TouchableOpacity onPress={() => setShow(!show)}>
                <Ionicons name={show ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={"aaa"}
                />
            </TouchableOpacity>
        )}
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 8,
        margin: 6,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        marginTop: 6,
        borderRaius: 150,
    },
})