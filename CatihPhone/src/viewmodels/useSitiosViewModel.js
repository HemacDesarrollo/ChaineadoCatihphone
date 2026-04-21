import { useState, useEffect } from "react";
import { api } from "../api/connect";

export function useSitiosViewModel() {
  const [sitios, setSitios] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearchState] = useState("");

const setSearch = (text) => {
  setSearchState(typeof text === "string" ? text : "");
};

  const cargarSitios = async () => {
    try {
      setLoading(true);

      const res = await api.get("/APP/sitios/asignados");

      //console.log("DATA FINAL:", res?.data?.data);

      const data = res?.data?.data ?? [];

      setSitios(data); 

    } catch (error) {
      console.log("Error sitios:", error);
      setSitios([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSitios();
  }, []);

  return {
    sitios,      
    loading,
    search,
    setSearch
  };
}