import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function MenuCard({title, icon, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={{width: "100%", backgroundColor: "#E5E5E5", borderRadius: 20, paddingVertical: 30, alignItems: "center", marginBottom: 30, elevation: 6}}>
            <Icon name={icon} size={60} color="#000"/>
            <Text style= {{fontSize: 20, marginTop: 15, fontWeight: "500"}}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
