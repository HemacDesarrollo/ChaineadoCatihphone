import { useState, useMemo, useEffect } from "react";
import { api } from "../api/connect";
const ESTADOS_ID = {
  CREADO: 1,
  ASIGNADO: 2,
  "EN PROCESO": 3,
  PAUSADO: 4,
  CERRADO: 5,
  COTIZACION: 6,
  RESUELTO: 7
};

export default function usePuntosConexionViewModel() {

  const [menuSeleccionado, setMenuSeleccionado] = useState("Puntos de\nConexión");
  const [modalNuevoTicket, setModalNuevoTicket] = useState(false);
  const [menuPrevio, setMenuPrevio] = useState("Puntos de\nConexión");

  const [search, setSearch] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalTickets, setTotalTickets] = useState(0);

  const PAGE_SIZE = 15;

  const esTicket = menuSeleccionado === "Mis\nTickets";

async function cargarTickets({ pagina = 1, estado = estadoSeleccionado } = {}) {

  if (loadingMore) return;

  try {

    setLoadingMore(true);

    const buscando = search.trim().length > 0;

    const filtrosRequest = {};

if (!estado || estado === "Todos") {
  filtrosRequest.idEstatus="1,2,3,4,5,6,7";
}else if (ESTADOS_ID[estado]){
  filtrosRequest.idEstatus = String(ESTADOS_ID[estado]);
}

if (search) {
  filtrosRequest.search = search;
}

const params = {
  pageNumber: buscando ? 1 : pagina,
  pageSize: buscando ? 1000 : PAGE_SIZE,
  ...(Object.keys(filtrosRequest).length > 0 && {
    filtros: JSON.stringify(filtrosRequest)
  })
};

    console.log("PARAMS ENVIADOS:", params);

    const response = await api.get("/APP/tickets", { params });
    console.log("RESPUESTA API:", response.data);


const nuevosTickets = Array.isArray(response?.data?.data)
  ? response.data.data
  : [];

  console.log("TICKETS RECIBIDOS:", nuevosTickets.length);
console.log("PRIMER TICKET:", nuevosTickets[0]);

const totalPages = response?.data?.meta?.totalPages ?? 1;

const totalCount = response?.data?.meta?.totalItems ?? 0;

if (pagina === 1) {
  setTickets(nuevosTickets);
  setTotalTickets(totalCount);
} else {
  setTickets(prev => [...prev, ...nuevosTickets]);
}

setPage(pagina);
setHasMore(pagina < totalPages);
}  catch (error) {

    console.log("Error cargando tickets", error);

  } finally {

    setLoadingMore(false);

  }
}

  const ticketsFiltrados = tickets;

  const cargarMasTickets = () => {

    if (!hasMore || loadingMore) return;

    const siguientePagina = page + 1;

    cargarTickets({
      pagina: siguientePagina,
      estado: estadoSeleccionado
    });

  };

  const aplicarFiltroEstado = (estado) => {

  const nuevoEstado = estado === "Todos" ? null : estado;

  setEstadoSeleccionado(nuevoEstado);
  setPage(1);
  setTickets([]);
  setTotalTickets(0);

  cargarTickets({
    pagina: 1,
    estado: nuevoEstado
  })
};

  useEffect(() => {

    if (esTicket) {

      cargarTickets({ pagina: 1 });

    }

  }, [esTicket]);

  useEffect(() => {

    if (!esTicket) return;

    const delay = setTimeout(() => {

      let texto = search.toLowerCase().trim();

      if (
        texto === "" ||
        texto === "h" ||
        texto === "he" ||
        texto === "he-" ||
        texto === "#" ||
        texto === "#h" ||
        texto === "#he" ||
        texto === "#he-"
      ) {

        cargarTickets({ pagina: 1 });
        return;

      }

      const numero = texto
        .replace("#", "")
        .replace("he-", "")
        .replace("he", "")
        .trim();

      if (numero.length > 0 && /^\d+$/.test(numero)) {

        cargarTickets({
          pagina: 1,
          filtros: { idLabel: numero }
        });

        return;

      }

      setTickets([]);

    }, 400);

    return () => clearTimeout(delay);

  }, [search]);

  const headerConfig = useMemo(() => {

    if (menuSeleccionado === "Mis\nTickets") {

      return {
        icon: "ticket-outline",
        title: "Mis \nTickets"
      };

    }

    if (menuSeleccionado === "Nuevo \nTicket") {

      return {
        icon: "add-circle-outline",
        title: "Nuevo \nTicket"
      };

    }

    return {
      icon: "wifi-outline",
      title: "Puntos \nConexión"
    };

  }, [menuSeleccionado]);

  const listTitle = esTicket
    ? "Listado de Tickets"
    : "Listado de Puntos \nde Conexión";

  const filtroMostrar = esTicket
    ? [
        "CREADO",
        "ASIGNADO",
        "EN PROCESO",
        "PAUSADO",
        "CERRADO",
        "COTIZACION",
        "RESUELTO"
      ]
    : ["Todos", "Activo", "Pendiente"];

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
    modalNuevoTicket,
    search,
    esTicket,
    tickets: ticketsFiltrados,
    filtroMostrar,
    filtroEstado: estadoSeleccionado,
    listTitle,
    headerConfig,
    totalTickets,
    loadingMore,

    setSearch,
    handleMenuPress,
    cerrarModal,
    cargarMasTickets,
    aplicarFiltroEstado

  };

}