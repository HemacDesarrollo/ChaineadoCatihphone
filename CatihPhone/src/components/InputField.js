import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../theme/ThemeContext";

export default function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  secure,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const {theme} = useTheme();
    
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.card, 
      color: theme.textTitle,
      borderColor: "#fff",
      borderWidth: 1,
      borderRadius: 30,
      padding: 10,
      marginBottom: 10
    }}>

      <Icon 
        name={icon} 
        size={20} 
        color={theme.icon}  
      />

      <TextInput
        style={{
          flex: 1,
          marginLeft: 10,
          color: theme.text   
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.text} 
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure && !showPassword}
      />

      {secure && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={theme.icon}
          />
        </TouchableOpacity>
      )}

    </View>
  );
}