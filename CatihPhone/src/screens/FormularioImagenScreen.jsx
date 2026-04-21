import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Modal } from "react-native";
import useDetalleTicketsViewModel from "../viewmodels/useDetalleTicketsViewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../theme/ThemeContext";

const TIPOS = [
  { label: "Antes", value: "antes" },
  { label: "Durante", value: "despuesActual" },
  { label: "Después", value: "despues" },
];

const FormularioImagenScreen = ({ route, navigation }) => {
  const { theme, isDark } = useTheme();
  const { idTicket, foto } = route.params;

  const { subirImagen } = useDetalleTicketsViewModel();

  const [tipo, setTipo] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [showTipos, setShowTipos] = useState(false);

  return (
  <LinearGradient
      colors={
        isDark
          ? ["#0F172A", "#1E293B"]
          : ["#0076A7", "#003B5C"]
      }
      style={{ flex: 1 }}
    >
   <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, padding: 15, backgroundColor: theme.background }}>

      <Image
        source={{
          uri: `data:image/jpeg;base64,${foto.thumbnail}`
        }}
        style={{ height: 250, borderRadius: 12 }}
      />

      <Text style={{ marginTop: 1, color: theme.text }}>
        {foto.lat}, {foto.lng}
      </Text>

      <Text style={{ marginTop: 15, fontWeight: "bold", color: theme.text }}>
        Tipo
      </Text>

      {/* <View style={{ flexDirection: "row", marginTop: 10 }}> */}
        
          <TouchableOpacity
            onPress={() => setShowTipos(true)}
            style={{
                marginTop: 10,
                padding: 15,
                borderRadius: 10,
                backgroundColor: theme.card,
                borderWidth: 1,
                borderColor: theme.border
            }}
            >
            <Text style={{ color: tipo ? theme.text : theme.text }}>
                {tipo
                ? TIPOS.find(t => t.value === tipo)?.label
                : "Seleccionar tipo"}
            </Text>
            </TouchableOpacity>
            <Modal visible={showTipos} transparent animationType="fade">
  <TouchableOpacity
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center"
    }}
    onPress={() => setShowTipos(false)}
  >
    <View style={{
      backgroundColor: theme.card,
      margin: 20,
      borderRadius: 12,
      padding: 10
    }}>

      {TIPOS.map(t => (
        <TouchableOpacity
          key={t.value}
          onPress={() => {
            setTipo(t.value);
            setShowTipos(false);
          }}
          style={{
            padding: 15,
            borderBottomWidth: 1,
            borderColor: "#eee"
          }}
        >
          <Text style={{
            fontSize: 16,
            color: tipo === t.value ? "#06b6d4" : theme.text
          }}>
            {t.label}
          </Text>
        </TouchableOpacity>
      ))}

    </View>
  </TouchableOpacity>
</Modal>
 

      <Text style={{ marginTop: 15, fontWeight: "bold", color: theme.text }}>
        Descripción
      </Text>

      <TextInput
        placeholder="Describe la imagen..."
        placeholderTextColor={theme.text}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline={true} 
        textAlignVertical="top" 
        style={{
            borderWidth: 1,
            marginTop: 8,
            padding: 10,
            height: 120,
            borderRadius: 8,
            textAlign: "left",
            color: theme.text,
            borderColor: theme.border,
            backgroundColor: theme.card
        }}
        />

      <TouchableOpacity
        onPress={async () => {
          if (!tipo) return alert("Selecciona tipo");
          if (!descripcion) return alert("Agrega descripción");

          await subirImagen({
            ...foto,
            tipo,
            descripcion,
            idTicket
          });

          navigation.replace("ImagenesTicket", {
            idTicket
          });
        }}
        style={{
          marginTop: 20,
          backgroundColor: "#06b6d4",
          padding: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
          Guardar imagen
        </Text>
      </TouchableOpacity>

    </View>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default FormularioImagenScreen;