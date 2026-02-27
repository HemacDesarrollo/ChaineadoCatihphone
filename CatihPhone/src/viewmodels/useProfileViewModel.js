import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../hooks/useAuth";
import { api } from "../api/connect";

export default function useProfileViewModel() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { user: authUser, logout } = useAuth();


  const stats = {
    asignados: 5,
    atendidos: 3,
  };

  const totalTickets = stats.asignados + stats.atendidos;

  const fullName = user
    ? `${user.Nombre ?? ""} ${user.Apellido ?? ""}`
    : "";

  useEffect(() => {
  if (!authUser) return;

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/APP/usuarios/me");
      setUser(response.data);
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
    if (!user) return "statusAway";

    switch (user.Estatus) {
      case "EN LÍNEA":
        return "statusOnline";
      case "OCUPADO":
        return "statusBusy";
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setUser((prev) => ({
          ...prev,
          foto: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.log("Error seleccionando foto:", error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return {
    user,
    loading,
    fullName,
    stats,
    totalTickets,
    statusStyleName: getStatusStyleName(),
    handleUpdatePhoto,
    handleLogout,
  };
}
