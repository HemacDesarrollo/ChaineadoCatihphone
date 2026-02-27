import { useState, useMemo } from "react";

export default function usePuntosConexionViewModel() {

  const [menuSeleccionado, setMenuSeleccionado] = useState("Puntos de\nConexión");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroTicket, setFiltroTicket] = useState("Todos");
  const [modalNuevoTicket, setModalNuevoTicket] = useState(false);
  const [menuPrevio, setMenuPrevio] = useState("Puntos de\nConexión");
  const [search, setSearch] = useState("");

  const [data] = useState([
    { id: "HC950", estado: "Activo" },
    { id: "HC951", estado: "Activo" },
    { id: "HC990", estado: "Pendiente" },
  ]);

  const [tickets] = useState([
    { id: "TK100", estadoTicket: "Abierto" },
    { id: "TK200", estadoTicket: "Abierto" },
    { id: "TK300", estadoTicket: "Cerrado" },
  ]);

  const esTicket = menuSeleccionado === "Mis\nTickets";

  const dataFiltrada = useMemo(() => {
    let resultado = data;

    if (filtroEstado !== "Todos") {
      resultado = resultado.filter(item => item.estado === filtroEstado);
    }

    if (search.trim() !== "") {
      resultado = resultado.filter(item =>
        item.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    return resultado;
  }, [filtroEstado, search, data]);

  const ticketsFiltrados = useMemo(() => {
    let resultado = tickets;

    if (filtroTicket !== "Todos") {
      resultado = resultado.filter(
        item => item.estadoTicket === filtroTicket
      );
    }

    if (search.trim() !== "") {
      resultado = resultado.filter(item =>
        item.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    return resultado;
  }, [filtroTicket, search, tickets]);

  const headerConfig = useMemo(() => {
    if (menuSeleccionado === "Mis\nTickets") {
      return { icon: "ticket-outline", title: "Mis \nTickets" };
    }
    if (menuSeleccionado === "Nuevo \nTicket") {
      return { icon: "add-circle-outline", title: "Nuevo \nTicket" };
    }
    return { icon: "wifi-outline", title: "Puntos \nConexión" };
  }, [menuSeleccionado]);

  const dataMostrar = esTicket ? ticketsFiltrados : dataFiltrada;

  const filtroMostrar = esTicket
    ? ["Todos", "Abierto", "Cerrado"]
    : ["Todos", "Activo", "Pendiente"];

  const listTitle = esTicket
    ? "Listado de Tickets"
    : "Listado de Puntos \nde Conexión";

  const handleMenuPress = (label) => {
    if (label === "Nuevo \nTicket") {
      setMenuPrevio(menuSeleccionado);
      setMenuSeleccionado(label);
      setModalNuevoTicket(true);
    } else {
      setMenuSeleccionado(label);
    }
  };

  const cerrarModal = () => {
    setModalNuevoTicket(false);
    setMenuSeleccionado(menuPrevio);
  };

  return {
   
    menuSeleccionado,
    filtroEstado,
    filtroTicket,
    modalNuevoTicket,
    search,
    esTicket,
    dataMostrar,
    filtroMostrar,
    listTitle,
    headerConfig,
    setSearch,
    setFiltroEstado,
    setFiltroTicket,
    handleMenuPress,
    cerrarModal,
  };
}
