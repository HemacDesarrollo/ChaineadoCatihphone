import React from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native";

export default function LinkText ({text, onPress, color}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.link, {color}]}></Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    link: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 15,
    },
})