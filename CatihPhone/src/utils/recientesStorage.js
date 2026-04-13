import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "RECENTES_TICKETS";

export const guardarReciente = async (ticket) => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    let recientes = data ? JSON.parse(data) : [];

    recientes = recientes.filter(
      (item) => item.idTicket !== ticket.idTicket
    );

    recientes.unshift(ticket);


    if (recientes.length > 20) {
      recientes = recientes.slice(0, 20);
    }

    await AsyncStorage.setItem(KEY, JSON.stringify(recientes));
  } catch (error) {
    console.log("Error guardando reciente:", error);
  }
};

export const obtenerRecientes = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error obteniendo recientes:", error);
    return [];
  }
};