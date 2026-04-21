import { useEffect, useState } from "react";
import { obtenerRecientes } from "../utils/recientesStorage";
import { api } from "../api/connect";
import { obtenerSitiosRecientes } from "../utils/sitiosStorage";

export const useRecientesViewModel = () => {
  const [recientes, setRecientes] = useState([]);
  const [sitiosRecientes, setSitiosRecientes] = useState([]);
  const [proyectos, setProyectos] = useState([]); 
  const [loading, setLoading] = useState(true);

  const cargarRecientes = async () => {
  setLoading(true);

  const tickets = await obtenerRecientes();
  const sitios = await obtenerSitiosRecientes();

  setRecientes(tickets);
  setSitiosRecientes(sitios);

  setLoading(false);
};

  const cargarProyectos = async () => {
    try {
      const response = await api.get("/APP/proyectos");
      setProyectos(response.data);
    } catch (error) {
      console.log("Error proyectos:", error);
    }
  };

  useEffect(() => {
    cargarRecientes();
    cargarProyectos();
  }, []);

  return {
    recientes,
    proyectos,
    sitiosRecientes,
    loading,
    cargarRecientes,
  };
};