import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Pagination({
  paginaActual,
  totalPaginas,
  onAnterior,
  onSiguiente
}) {

  return (
    <View style={styles.container}>

      <TouchableOpacity
        disabled={paginaActual === 1}
        onPress={onAnterior}
        style={[
          styles.boton,
          paginaActual === 1 && styles.botonDisabled
        ]}
      >
        <Text style={styles.texto}>Anterior</Text>
      </TouchableOpacity>

      <Text style={styles.numero}>
        Página {paginaActual} de {totalPaginas}
      </Text>

      <TouchableOpacity
        disabled={paginaActual === totalPaginas}
        onPress={onSiguiente}
        style={[
          styles.boton,
          paginaActual === totalPaginas && styles.botonDisabled
        ]}
      >
        <Text style={styles.texto}>Siguiente</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:10
  },

  boton:{
    backgroundColor:"#0076A7",
    paddingVertical:8,
    paddingHorizontal:15,
    borderRadius:8
  },

  botonDisabled:{
    backgroundColor:"#999"
  },

  texto:{
    color:"#fff",
    fontWeight:"bold"
  },

  numero:{
    color:"#fff",
    fontWeight:"bold"
  }

});