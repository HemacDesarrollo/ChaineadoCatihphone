import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../theme/ThemeContext";

export default function MenuCard({title, icon, onPress}) {
    const { theme, isDark } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} style={{
                width: "100%", 
                backgroundColor: theme.card, 
                borderRadius: 20, 
                height: 150,
                width: 250,
                borderWidth: 1,
                borderColor: "#fff",
                paddingVertical: 35, 
                shadowColor: "#000",
                shadowOpacity: 5,
                alignItems: "center", 
                marginBottom: 30, 
                elevation: 6,
                shadowRadius: 100,
                padding: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: isDark ? 0.3 : 0.15,
                shadowRadius: 6,
                elevation: isDark ? 8 : 4,
                }}>
            <Icon name={icon} size={60} color={theme.icon}/>
            <Text style= {{fontSize: 20, marginTop: 15, fontWeight: "500", color: theme.text}}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
