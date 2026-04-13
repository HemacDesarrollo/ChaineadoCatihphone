import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  BackHandler,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";

export default function SearchSelect({
  label,
  data,
  value,
  onSelect,
  keyField = "",
  labelField = "",
  placeholder,
  theme,
  isDark
}) {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

   useEffect(() => {
  const backAction = () => {
    if (modalVisible) {
      setModalVisible(false);
      return true;
    }
    return false;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
}, [modalVisible]);

 const filteredData = Array.isArray(data)
  ? data.filter(item => {
      const texto = String(item?.[labelField] || "").toLowerCase();
      return texto.includes(search.toLowerCase());
    })
  : [];


  return (
    <View style={{ marginBottom: 15 }}>

      <Text style={{ fontWeight: "bold", marginBottom: 5, color: isDark ? "#fff" : theme.text}}>
        {label}
      </Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 10
        }}
      >
        <Text style={{color:theme.text}}>
            {value?.length
                ? `${value.length} seleccionadas`
                : "Seleccionar"}
            </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>

        <View style={{ flex: 1, padding: 20, backgroundColor: theme.background}}>

          <TextInput
            placeholder={placeholder || `Buscar ${label}...`}
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 10,
              marginBottom: 15
            }}
          />

          <ScrollView>

           {filteredData.map((item, index) => {
            const itemValue = item;
            const seleccionado = (value || []).some(
                v => v?.[keyField] === item[keyField]
              );
              
            return (
              <TouchableOpacity
                key={`${itemValue}-${index}`}
                onPress={() => {
                  const lista = value || [];

                  let nuevosValores;

                  const existe = lista.some(
                    v => v?.[keyField] === item[keyField]
                  );

                  if (existe) {
                   
                    nuevosValores = lista.filter( v => v?.[keyField] !== item[keyField]);
                  } else {
                    nuevosValores = [...lista, itemValue];
                  }

                  onSelect(nuevosValores);
                }}
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: seleccionado
                    ? (isDark ? theme.primary : "#e60023")
                    : theme.card,
                  //borderWidth: 1,
                  borderColor: seleccionado
                    ? theme.primary
                    : theme.border
                }}
              >
                <Text style={{ 
                  fontWeight: "bold",
                  color: seleccionado 
                    ? "#fff" 
                    : (isDark ? "#fff" : theme.text)
                }}>
                  {(() => {
                    const val = item[labelField] ?? item;

                    if (typeof val === "object") {
                      return JSON.stringify(val);
                    }

                    return String(val);
                  })()}
                </Text>
              </TouchableOpacity>
            );
          })}

          </ScrollView>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              marginTop: 10,
              padding: 12,
              backgroundColor: "#e60023",
              borderRadius: 10
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Cerrar
            </Text>
          </TouchableOpacity>

        </View>

      </Modal>

    </View>
  );
}