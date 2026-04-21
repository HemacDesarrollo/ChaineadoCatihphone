import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_SITIOS = "RECENTES_SITIOS";

export const guardarSitioReciente = async (sitio) => {
  try {
    const data = await AsyncStorage.getItem(KEY_SITIOS);
    let recientes = data ? JSON.parse(data) : [];

    recientes = recientes.filter(
      (item) => item.idSitio !== sitio.idSitio
    );

    recientes.unshift(sitio);

    if (recientes.length > 20) {
      recientes = recientes.slice(0, 20);
    }

    await AsyncStorage.setItem(KEY_SITIOS, JSON.stringify(recientes));
  } catch (error) {
    console.log("Error guardando sitio:", error);
  }
};

export const obtenerSitiosRecientes = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY_SITIOS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error obteniendo sitios:", error);
    return [];
  }
};