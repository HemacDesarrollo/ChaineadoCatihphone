import { useState, useMemo, useEffect,useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import { useAuth } from "../hooks/useAuth.js";

export default function usePuntosConexionViewModel() {

  const [menuSeleccionado, setMenuSeleccionado] = useState("Mis\nTickets")
  const [modalNuevoTicket, setModalNuevoTicket] = useState(false);
  const [menuPrevio, setMenuPrevio] = useState("Puntos de Conexión");

  const [search, setSearch] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalTickets, setTotalTickets] = useState(0);
  const { filtrosTickets, setFiltrosTickets } = useAuth();
  const filtrosExtra = filtrosTickets;
  const setFiltrosExtra = setFiltrosTickets;
  const [categorias, setCategorias] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [sitios, setSitios] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [tipoProblemaFiltros, setTipoProblemaFiltros] = useState([]);

  const [proyectosFiltros, setProyectosFiltros] = useState({
  nombres: [],
  contratos: [],
  fechasRegistro: [],
  fechasFin: []
});

const limpiarFiltros = () => {
  setTickets([]);
  setPage(1);
  setHasMore(true);

  cargarTickets(); 
};

useEffect(() => {
  cargarCategorias();
  cargarEmpresas();
  cargarSitios();
  getTipoProblema();    
  getFiltrosProyectos();  
}, []);

useFocusEffect(
  useCallback(() => {
    if (!esTicket) return;

    setPage(1);
    setTickets([]);
    setHasMore(true);

    cargarTickets({
      pagina: 1,
      filtros: filtrosExtra
    });

  }, [esTicket])
);

//console.log("TIPO PROBLEMA FILTROS:", tipoProblemaFiltros);

const getTipoProblema = async () => {
  try {
    const res = await api.get("/APP/tipoproblema/filtros");
    //console.log("TIPO PROBLEMA:", res.data);

    setTipoProblemaFiltros(res.data.tiposProblema || []);
  } catch (error) {
    //console.log("Error tipo problema:", error);
  }
};
    
const getFiltrosProyectos = async () => {
  try {
    //console.log("LLAMANDO API PROYECTOS...");
    
    const res = await api.get("/APP/proyectos/filtros");

    //console.log("RESPUESTA PROYECTOS:", res.data);

    const data = res.data || [];

    const unique = (arr, key) => {
      return [...new Map(arr.map(item => [item[key], item])).values()];
    };


    //onsole.log("DESPUES DE LLAMAR ENDPOINT PROYECTOS");

    setProyectosFiltros({
      nombres: unique(data.nombres || [], "Nombre"),
      contratos: unique(data.contratos || [], "NumContrato"),
      fechasRegistro: unique(data.fechasRegistro || [], "Fecha_Registro"),
      fechasFin: unique(data.fechasFin || [], "Fecha_Fin")
    });

  } catch (error) {
    //console.log("ERROR PROYECTOS:", error);
  }
};


  const numeroBusqueda = useMemo(() => {
  const texto = search.toUpperCase().trim();
  const match = texto.match(/\d+/);
  return match ? match[0] : null;
}, [search]);

  const PAGE_SIZE = 15;

  const esTicket = menuSeleccionado === "Mis\nTickets";
  async function cargarCategorias() {

  try {

    const response = await api.get("/APP/tickets/categorias");

    //console.log("CATEGORIAS API:", response.data);

    const data = response?.data?.data || response.data || [];

    setCategorias(data);

  } catch (error) {

    //console.log("ERROR CARGANDO CATEGORIAS:", error);
    }

}


async function cargarMunicipios(estado) {
  try {

    const estadoFinal =
  typeof estado === "string"
    ? estado
    : estado?.estado || estado?.[0]?.estado || estado?.[0];
    //console.log("ESTADO FINAL:", estadoFinal);

    const response = await api.get("/APP/tickets/municipios", {
      params: { estado: estadoFinal }
    });

    const data = response?.data?.data || [];

    setMunicipios(data);

  } catch (error) {
    //console.log("Error cargando municipios:", error);
  }
}

async function cargarEmpresas() {
  try {

    //console.log("LLAMANDO EMPRESAS...");

    const response = await api.get("/APP/tickets/empresas");

    //console.log("EMPRESAS API:", response.data);

    const data = Array.isArray(response.data)
    ? response.data
    : response.data?.data || [];


    setEmpresas(data);

  } catch (error) {
    //console.log("Error cargando empresas:", error);
  }
}

async function cargarSitios() {
  try {

    //console.log("LLAMANDO SITIOS...");

    const response = await api.get("/APP/tickets/sitios");

    //console.log("SITIOS API:", response.data);

    const data = Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];

    setSitios(data);

  } catch (error) {
   // console.log("Error cargando sitios:", error);
  }
}


async function cargarTickets({ pagina = 1, estado = estadoSeleccionado, idLabel = null, filtros = filtrosExtra } = {}) {

  try {

    if (loadingMore && pagina !== 1) return;

    setLoadingMore(true);

    const buscando = !!idLabel;
    console.log("FILTROS EXTRA:", filtros);
    const limpiarTexto = (texto) => {
      return texto
        .replace(/"/g, "")     
        .replace(/\n/g, "")    
        .trim();             
    };
    const filtrosRequest = {};

    if (Array.isArray(filtros.estatus) && filtros.estatus.length > 0) {

  const estadosIds = filtros.estatus
    .map(e => ESTADOS_ID[e])
    .filter(Boolean);

  if (estadosIds.length > 0) {
    filtrosRequest.idEstatus = estadosIds.join(",");
  }

}
if (Array.isArray(filtros.idCategoria) && filtros.idCategoria.length > 0) {
  filtrosRequest.idCategoria = filtros.idCategoria.join(",");
}

if (Array.isArray(filtros.empresa) && filtros.empresa.length > 0) {
  filtrosRequest.idEmpresaProveedor = filtros.empresa.join(",");
}
if (Array.isArray(filtros.sitio) && filtros.sitio.length > 0) {
  filtrosRequest.idSitio = filtros.sitio.join(",");
}

if (Array.isArray(filtros.proyecto) && filtros.proyecto.length > 0) {
  filtrosRequest.idProyecto = filtros.proyecto.join(",");
}

if (filtros.nombreSitio) {
  filtrosRequest.nombreSitio = filtros.nombreSitio;
}

if (Array.isArray(filtros.estadoSitio) && filtros.estadoSitio.length > 0) {
  filtrosRequest.estado = filtros.estadoSitio
    .map(e => e.estado || e)
    .join(",");
}

if (Array.isArray(filtros.municipioSitio) && filtros.municipioSitio.length > 0) {
  filtrosRequest.municipio = filtros.municipioSitio
    .map(m => m.municipio || m)
    .join(",");
}

if (filtros.rangoFecha) {
  const hoy = new Date();
  let fechaDesde = new Date();
  let fechaHasta = new Date();

  switch (filtros.rangoFecha) {
    case "HOY":
      fechaDesde.setHours(0, 0, 0, 0);
      fechaHasta.setHours(23, 59, 59, 999);
      break;

    case "7_DIAS":
      fechaDesde.setDate(hoy.getDate() - 7);
      break;

    case "MES":
      fechaDesde.setMonth(hoy.getMonth() - 1);
      break;

    case "ANIO":
      fechaDesde.setFullYear(hoy.getFullYear() - 1);
      break;

    case "MAS_ANIO":
      fechaHasta.setFullYear(hoy.getFullYear() - 1);
      fechaDesde = null;
      break;
  }

  if (fechaDesde) {
    filtrosRequest.fechaRegistroDesde = fechaDesde.toISOString();
  }

  if (fechaHasta) {
    filtrosRequest.fechaRegistroHasta = fechaHasta.toISOString();
  }
}

if (filtros.fechaRegistroDesde && filtros.fechaRegistroHasta) {
  filtrosRequest.fechaRegistroDesde = filtros.fechaRegistroDesde;
  filtrosRequest.fechaRegistroHasta = filtros.fechaRegistroHasta;
}

if (filtros.fechaFinDesde && filtros.fechaFinHasta) {
  filtrosRequest.fechaFinDesde = filtros.fechaFinDesde;
  filtrosRequest.fechaFinHasta = filtros.fechaFinHasta;
}

if (Array.isArray(filtros.nombreProyecto) && filtros.nombreProyecto.length > 0) {
  filtrosRequest.nombreProyecto = filtros.nombreProyecto.map(limpiarTexto);
}

if (Array.isArray(filtros.numContrato) && filtros.numContrato.length > 0) {
  filtrosRequest.numContrato = filtros.numContrato.map(limpiarTexto);
}

if (Array.isArray(filtros.fechaRegistroProyecto) && filtros.fechaRegistroProyecto.length > 0) {
  const item = filtros.fechaRegistroProyecto[0];

  const fecha = item.Fecha_Registro || item;

  filtrosRequest.fechaRegistroDesde = fecha;
  filtrosRequest.fechaRegistroHasta = fecha;
}

if (Array.isArray(filtros.fechaFinProyecto) && filtros.fechaFinProyecto.length > 0) {
  const item = filtros.fechaFinProyecto[0];

  const fecha = item.Fecha_Fin || item;

  filtrosRequest.fechaFinDesde = fecha;
  filtrosRequest.fechaFinHasta = fecha;
}

if (
  Array.isArray(filtros.tipoProblema) &&
  filtros.tipoProblema.length > 0 &&
  filtros.tipoProblema.length < tipoProblemaFiltros.length
) {
  filtrosRequest.tipoProblema = filtros.tipoProblema.join(",");
} else {
  delete filtrosRequest.tipoProblema;
}

if (idLabel) {
  filtrosRequest.idLabel = idLabel;
}

const texto = search.toUpperCase().trim();

const prefijosMostrarTodo = [
  "",
  "#",
  "#H",
  "#HE",
  "#HE-",
  "H",
  "HE",
  "HE-"
];

const numeroMatch = texto.match(/\d+/);
const numero = numeroMatch ? numeroMatch[0] : null;

if (search && !prefijosMostrarTodo.includes(texto) && !numero) {
  filtrosRequest.search = search;
}

console.log("FILTROS COMPLETOS:", filtros);
console.log("FECHA REGISTRO RAW:", filtros.fechaRegistroProyecto);
console.log("FECHA FIN RAW:", filtros.fechaFinProyecto);

const params = {
  pageNumber: pagina,
  pageSize: PAGE_SIZE,
  ...(Object.keys(filtrosRequest).length > 0 && {
    filtros: JSON.stringify(filtrosRequest)
  })
};
console.log("FILTROS ENVIADOS:", filtrosRequest);

    //console.log("PARAMS ENVIADOS:", params);
    const response = await api.get("/APP/tickets", { params });
    //console.log("RESPUESTA API:", response.data);


const nuevosTickets = Array.isArray(response?.data?.data)
  ? response.data.data
  : [];

 // console.log("TICKETS RECIBIDOS:", nuevosTickets.length);
// console.log("PRIMER TICKET:", nuevosTickets[0]);

const totalPages = response?.data?.meta?.totalPages ?? 1;

const totalCount = response?.data?.meta?.totalItems ?? 0;

if (pagina === 1) {
  setTickets(nuevosTickets);
  setTotalTickets(totalCount);
} else {
  setTickets(prev => [...new Map ([...prev, ...nuevosTickets].map(t => [t.idTicket, t])).values()]);
}

setPage(pagina);
setHasMore(pagina < totalPages);
}  catch (error) {

    //console.log("Error cargando tickets", error);

  } finally {

    setLoadingMore(false);

  }
}

  const ticketsFiltrados = tickets;

  const cargarMasTickets = () => {


  if (!hasMore || loadingMore) {
    //console.log("SCROLL BLOQUEADO");
    return;
  }

  const siguientePagina = page + 1;

  //console.log("CARGANDO PAGINA:", siguientePagina);

  cargarTickets({
    pagina: siguientePagina,
    estado: estadoSeleccionado,
    idLabel: numeroBusqueda
  });

};

  const aplicarFiltroEstado = (estado) => {

  const nuevoEstado = estado === "Todos" ? null : estado;

  setEstadoSeleccionado(nuevoEstado);
  setPage(1);
  setTickets([]);
  setHasMore(true);
};
const aplicarFiltrosAvanzados = (nuevosFiltros) => {

if (!nuevosFiltros || Object.keys(nuevosFiltros).length === 0) {
  setFiltrosExtra({}); 
} else {
  setFiltrosExtra(nuevosFiltros);
}
  setPage(1);
  setTickets([]);
  setHasMore(true);

  // cargarTickets({
  //   pagina: 1, filtros: nuevosFiltros
  // });

};

//   useEffect(() => {
//   if (esTicket) {
//     cargarTickets({ pagina: 1, filtros: filtrosExtra });
//   }
// }, [esTicket]);
 

  useEffect(() => {

  if (!esTicket) return;

  console.log("FILTROS EXTRA FINAL:", filtrosExtra);
  cargarTickets({
    pagina: 1,
    filtros: filtrosExtra
  });

}, [filtrosExtra]);



  useEffect(() => {

  if (!esTicket) return;

  const delay = setTimeout(() => {

    const texto = search.toUpperCase().trim();

    const prefijosMostrarTodo = [
      "",
      "#",
      "#H",
      "#HE",
      "#HE-",
      "H",
      "HE",
      "HE-"
    ];

    setPage(1);
    setTickets([]);
    setHasMore(true);

    if (prefijosMostrarTodo.includes(texto)) {
      cargarTickets({ pagina: 1, filtros: filtrosExtra });
      return;
    }

    if (numeroBusqueda) {
      cargarTickets({
        pagina: 1,
        idLabel: numeroBusqueda
      });
      return;
    }

    setTickets([]);

  }, 300);

  return () => clearTimeout(delay);

}, [search]);

  const headerConfig = useMemo(() => {

    if (menuSeleccionado === "Mis\nTickets") {

      return {
        icon: "ticket-outline",
        title: "Mis Tickets"
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
  const estadosUnicos = useMemo(() => {
  const estados = sitios.map(s => s.estado);
  return [...new Set(estados)];
}, [sitios]);

const seleccionarEstado = (estado) => {

  const estadoFinal =
    typeof estado === "string"
      ? estado
      : estado?.estado;

  cargarMunicipios(estadoFinal);

  const nuevosFiltros = {
    ...filtrosExtra,
    estadoSitio: [estadoFinal],
    municipioSitio: [] 
  };

  setFiltrosExtra(prev => ({
  ...prev,
  ...nuevosFiltros
}));
};

const seleccionarMunicipio = (municipio) => {

  const nuevosFiltros = {
    ...filtrosExtra,
    municipioSitio: [municipio]
  };

  aplicarFiltrosAvanzados(nuevosFiltros);
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
    empresas,
    sitios,
    municipios,
    cargarMunicipios,
    cargarEmpresas,
    estadosUnicos,
    seleccionarEstado,
    seleccionarMunicipio,

    setSearch,
    handleMenuPress,
    cerrarModal,
    cargarMasTickets,
    aplicarFiltroEstado,
    aplicarFiltrosAvanzados,
    categorias,
    setCategorias,
    setEmpresas,
    proyectosFiltros,
    tipoProblemaFiltros,
    filtrosExtra,
  };

}