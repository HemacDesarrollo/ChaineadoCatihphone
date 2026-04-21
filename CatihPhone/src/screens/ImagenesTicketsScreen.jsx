import React, { useEffect, useState,useCallback } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Modal, StyleSheet, TextInput, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useDetalleTicketsViewModel from "../viewmodels/useDetalleTicketsViewModel";
import CameraWithCoords from "../components/CameraWithCoords";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import ImageViewer from "react-native-image-zoom-viewer";

const ImagenesTicketScreen = ({ route }) => {
  const { theme, isDark } = useTheme();

  const { obtenerImagenes, subirImagen } = useDetalleTicketsViewModel();

  const [imagenes, setImagenes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const { idTicket, foto: fotoInicial } = route.params || {};
  const [foto, setFoto] = useState(fotoInicial || null);
  const [tipo, setTipo] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  

  const TIPOS = [
    { label: "Antes", value: "antes" },
    { label: "Durante", value: "despuesActual" },
    { label: "Después", value: "despues" },
  ];

  useFocusEffect(
  useCallback(() => {
    cargarImagenes();
  }, [])
);

useEffect(() => {
  const backAction = () => {
    if (selected) {
      setSelected(null);
      return true; 
    }
    return false;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
}, [selected]);

  const cargarImagenes = async () => {
    const data = await obtenerImagenes(idTicket);
    setImagenes(Array.isArray(data) ? data.filter(i => i.thumbnail) : []);
  };

  return (
  <LinearGradient
  colors={
    isDark
      ? ["#0F172A", "#1E293B"]
      : ["#0076A7", "#003B5C"]
  }
  style={{ flex: 1 }}
>
  <SafeAreaView style={{ flex: 1}}>
    <View style={{ flex: 1, padding: 10 }}>

      <TouchableOpacity
        onPress={() => {
          if (imagenes.length >= 10) {
            alert("Máximo 10 imágenes permitidas");
            return;
          }
          setShowCamera(true);
        }}
      >
        {/* <Text style={{ color: "#06b6d4", fontWeight: "bold" }}>
          + Agregar imagen
        </Text> */}
      </TouchableOpacity>

      {foto && (
        <View style={{ marginVertical: 10 }}>

          <Image
            source={{ uri: `data:image/jpeg;base64,${foto.thumbnail}` }}
            style={{ height: 200, borderRadius: 10 }}
          />

          <Text>{foto.lat}, {foto.lng}</Text>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {TIPOS.map(t => (
              <TouchableOpacity key={t.value} onPress={() => setTipo(t.value)}>
                <Text style={{
                  marginRight: 10,
                  padding: 8,
                  backgroundColor: tipo === t.value ? "#06b6d4" : theme.background,
                  borderRadius: 6
                }}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            style={{
              borderWidth: 1,
              marginTop: 10,
              padding: 8,
              borderRadius: 6
            }}
          />

          <TouchableOpacity
            onPress={async () => {
              if (imagenes.length >= 10) {
              alert("Ya alcanzaste el límite de 10 imágenes");
              return;
  }

              if (!tipo) return alert("Selecciona tipo");
              if (!descripcion) return alert("Agrega descripción");

              await subirImagen({
                thumbnail: foto.thumbnail,
                imagen: foto.imagen,
                lat: foto.lat,
                lng: foto.lng,
                idTicket: idTicket,  
                tipo: tipo,           
                descripcion: descripcion 
              });

              setFoto(null);
              setTipo(null);
              setDescripcion("");

              cargarImagenes();
            }}
            style={{
              marginTop: 10,
              backgroundColor: theme.background,
              padding: 10,
              borderRadius: 8
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Guardar
            </Text>
          </TouchableOpacity>

        </View>
      )}

      {imagenes.length === 0 && !foto && (
        <View style={{ alignItems: "center", marginTop: 150, }}>
          
          <LottieView
            source={require("../assets/animations/SinImagen.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />

          <Text style={{ marginTop: 10, color: theme.text }}>
            Aún no se han agregado imágenes
          </Text>

        </View>
      )}

      <FlatList
  data={imagenes}
  keyExtractor={(item) => item.idImagen.toString()}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: "space-between" }}
  contentContainerStyle={{ paddingBottom: 60 }}
  renderItem={({ item }) => (
    <View style={[styles.cardGrid,{backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1} ]}>

      <TouchableOpacity onPress={() => setSelected(item)}>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${item.thumbnail}`
          }}
          style={[styles.imageGrid, {borderColor: "#000"}]}
        />
      </TouchableOpacity>

      <Text style={{marginTop: 10, backgroundColor: theme.card, color: theme.text}}>
        {item.lat}, {item.lng}
      </Text>

    </View>
  )}
/>

      <Modal visible={!!selected} transparent>
        <ImageViewer
          imageUrls={
            selected
              ? [{ url: `data:image/jpeg;base64,${selected.imagen}` }]
              : []
          }
          enableSwipeDown
          onSwipeDown={() => setSelected(null)}
          onCancel={() => setSelected(null)}
          onClick={() => setSelected(null)}
          backgroundColor="black"
        />
      </Modal>

      {showCamera && imagenes.length < 10 &&(
        <View style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999
        }}>
          <CameraWithCoords
            idTicket={idTicket}
            onImageTaken={(data) => {
              if (imagenes.length >= 10) {
                alert("Límite alcanzado");
                setShowCamera(false);
                return;
              }

              setShowCamera(false);

              navigation.navigate("FormularioImagen", {
                idTicket,
                foto: data
              });
            }}
            onClose={() => setShowCamera(false)}
          />
        </View>
      )}

      <TouchableOpacity
          onPress={() => {
              if (imagenes.length >= 10) {
                alert("Máximo 10 imágenes por ticket");
                return;
              }

              setShowCamera(true);
            }}
          style={{
            position: "absolute",
            bottom: 20,
            alignSelf: "center",
            backgroundColor: "#06b6d4",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 30,
            elevation: 5
          }}
        >
          <View style={{flexDirection: "row", alignItems: "center",}}>
          <Icon name="camera" size={28} />   
          <Text> Agregar Imágen</Text> 
          </View>
        </TouchableOpacity>
       

    </View>
  </SafeAreaView>
  </LinearGradient>
  );
};

export default ImagenesTicketScreen;

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  coords: {
    marginTop: 6,
    color: "#555",
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  cardGrid: {
  width: "48%",
  marginBottom: 12,
  borderRadius: 12,
  padding: 8,
  elevation: 3,
},

imageGrid: {
  width: "100%",
  height: 120,
  borderRadius: 10,
  borderWidth: 1
},
});