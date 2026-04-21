import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, Camera } from "expo-camera";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Ionicons";
import useDetalleTicketsViewModel from "../viewmodels/useDetalleTicketsViewModel.js";
import * as ImageManipulator from "expo-image-manipulator";

const CameraWithCoords = ({ onImageTaken, onClose, idTicket }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);

  const {subirImagen} = useDetalleTicketsViewModel();

  useEffect(() => {
    (async () => {
      const cam = await Camera.requestCameraPermissionsAsync();
      const loc = await Location.requestForegroundPermissionsAsync();

      setHasPermission(
        cam.status === "granted" && loc.status === "granted"
      );
    })();
  }, []);

  const takePhoto = async () => {
  if (!cameraRef.current) return;

  try {
    const photo = await cameraRef.current.takePictureAsync();

    const thumb = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 300 } }],
      {
        compress: 0.4,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );

    const full = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 1000 } }],
      {
        compress: 0.7,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );

    const location = await Location.getCurrentPositionAsync({});

    const lat = location.coords.latitude.toFixed(6);
    const lng = location.coords.longitude.toFixed(6);

    onImageTaken({
      thumbnail: thumb.base64,
      imagen: full.base64,
      lat,
      lng,
    });

    onClose();

  } catch (error) {
    console.log("Error al tomar foto:", error);
  }
};

  if (hasPermission === null) return <Text>Solicitando permisos...</Text>;
  if (hasPermission === false) return <Text>Sin permisos</Text>;

  return (
  <View style={{ flex: 1 }}>
    
    <CameraView
      ref={cameraRef}
      style={StyleSheet.absoluteFillObject}
    />

    <View style={styles.controls}>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.btn}>Cerrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={takePhoto}>
        <Icon name="camera" size={28} style={styles.btn} />
      </TouchableOpacity>
    </View>

  </View>
);
};

export default CameraWithCoords;

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#00000088",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16
  },
});