import { useState, useEffect, useRef, useContext } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { api } from "../api/connect";
import { AuthContext } from "../context/AuthContext";




export default function useProfileViewModel() {
  const [loading, setLoading] = useState(false);
 const { user: authUser, logout, updateUserData } = useContext(AuthContext);
 const [profileData, setProfileData] = useState(null);


  const stats = {
    asignados: 5,
    atendidos: 3,
  };

  const totalTickets = stats.asignados + stats.atendidos;

  const fullName = profileData
  ? `${profileData.Nombre ?? ""} ${profileData.Apellido ?? ""}`
  : "";

useEffect(() => {
    if (!authUser) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/APP/usuarios/me");
        setProfileData(response.data);

      } catch (error) {
        console.log("Error trayendo usuario:", error);

        if (error.response?.status === 401) {
          
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);


  const getStatusStyleName = () => {
  if (!authUser) return "statusAway";

  switch (authUser.Estatus) {
    case "EN LINEA":
      return "statusOnline";
    case "AUSENTE":
      return "statusAway";
    case "DESCONECTADO":
      return "statusOffline";
    default:
      return "statusAway";
  }
};

  const handleUpdatePhoto = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Necesitamos permiso para acceder a tus fotos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        const image = result.assets[0];

        const compressedImage = await ImageManipulator.manipulateAsync(
          image.uri,
          [
            {resize: {width: 300}}
          ],
          {
            compress: 0.5,
            format: ImageManipulator.SaveFormat.JPEG,
          }
          
        );
        const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri);
        console.log("PESO FINAL:", fileInfo.size);
        console.log("DIMENSIONES FINALES:", compressedImage.width, compressedImage.height);

        //console.log("IMAGE ASSET COMPLETO:", image);
        //console.log("URI:", image.uri);
        //console.log("IMAGE:", image);


        const formData = new FormData();
        formData.append("foto", {
          uri: compressedImage.uri,
          name: `profile_${Date.now()}.jpg`,
          type: "image/jpeg",
        });

        setLoading(true);

        const response = await api.put(
          "/APP/usuarios/foto",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data) => data,
          }
        );



        setProfileData(response.data);
        updateUserData(response.data);
      }
    } catch (error) {
      console.error("ERROR COMPLETO:", error);
  Alert.alert(
    "Error",
    "No se pudo actualizar la foto. Intenta nuevamente mas tarde."
  );
    }finally{
      setLoading(false);
    }
  };

const handleLogout = () => {
  Alert.alert(
    "Cerrar sesión",
    "¿Deseas salir de tu cuenta?",
    [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: async () => {
        logout();
      } }
    ]
  );
};


  return {
    user: profileData,
    authUser,
    loading,
    fullName,
    stats,
    totalTickets,
    statusStyleName: getStatusStyleName(),
    handleUpdatePhoto,
    handleLogout,
  };
}
