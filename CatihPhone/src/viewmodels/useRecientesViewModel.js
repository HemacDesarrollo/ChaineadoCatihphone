import { useEffect, useState } from "react";
import { obtenerRecientes } from "../utils/recientesStorage";
import { api } from "../api/connect";

export const useRecientesViewModel = () => {
  const [recientes, setRecientes] = useState([]);
  const [proyectos, setProyectos] = useState([]); 
  const [loading, setLoading] = useState(true);

  const cargarRecientes = async () => {
    setLoading(true);
    const data = await obtenerRecientes();
    setRecientes(data);
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
    loading,
    cargarRecientes,
  };
};