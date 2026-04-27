import { api } from "../api/connect";
import { API_BASE_URL } from "../api/connect";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useDetalleTicketsViewModel = () => {

const {user} = useContext(AuthContext);


 const subirImagen = async ({ thumbnail, imagen, lat, lng, idTicket, tipo, descripcion }) => {
  try {
    console.log("Enviando imagen base64...");

    const response = await fetch(`${API_BASE_URL}/APP/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        thumbnail,
        imagen,
        lat,
        lng,
        idTicket,
        tipo,
        descripcion
      }),
    });

    const data = await response.json();

    console.log("Respuesta:", data);

    return data;

  } catch (error) {
    console.log("Error subirImagen:", error);
    return null;
  }
};

const obtenerImagenes = async (idTicket) => {
  try {
    console.log("Llamando imágenes de ticket:", idTicket);

    const response = await fetch(`${API_BASE_URL}/APP/imagenes/${idTicket}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const data = await response.json();

    console.log("RESPUESTA IMAGENES:", data);

    return data;

  } catch (error) {
    console.log("Error obtenerImagenes:", error);
    return [];
  }
};
const obtenerDetalleTicket = async (idTicket) => {
  try {
    const response = await fetch(`${API_BASE_URL}/APP/tickets/${idTicket}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const text = await response.text();

try {
  const data = JSON.parse(text);
  console.log("DETALLE TICKET:", data);
  return data;
} catch (e) {
  console.log("RESPUESTA NO ES JSON:", text);
  return null;
}

    console.log("DETALLE TICKET:", data);

    return data;

  } catch (error) {
    console.log("Error obtenerDetalleTicket:", error);
    return null;
  }
};
  return {
    subirImagen,
    obtenerImagenes,
    obtenerDetalleTicket
  };
};

export default useDetalleTicketsViewModel;