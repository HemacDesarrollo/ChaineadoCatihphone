import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  BackHandler,
} from "react-native";
import SearchSelect from "./SearchSelect";
import { useTheme } from "../theme/ThemeContext";

export default function FiltrosTicketsModal({
  visible,
  onClose,
  aplicarFiltros,
  estados,
  categorias,
  empresas, 
  sitios,
  estadosSitio,
  direccionesSitio,
  estadosGeo,
  municipios,
  onSelectEstado,
  onSelectMunicipio,
  tipoProblemaFiltros,
  proyectosFiltros = {
    nombres: [],
    contratos: [],
    fechasRegistro: [],
    fechasFin: [],
  },
  
  filtrosActuales
}) {
  const { theme, isDark } = useTheme();

  const construirFiltros = (filtros) => {
  return {
    estatus: filtros.estatus,

    empresa: filtros.empresa.map(e => e.idEmpresa),

    categoria: filtros.categoria.map(c => c.idCategoria),

    tipoProblema: filtros.tipoProblema.map(t => t.Nombre_problema),

    estado: filtros.estadoSitio.map(e => e.estado),

    municipio: filtros.municipioSitio.map(m => m.municipio),

    nombreProyecto: filtros.nombreProyecto.map(p => p.Nombre),

    numContrato: filtros.numContrato.map(n => n.NumContrato),

    fechaDesde: filtros.fechaDesde,
    fechaHasta: filtros.fechaHasta,
  };
};

const formatearFecha = (fecha) => {
  if (!fecha) return null;
  return fecha.split("T")[0];
};
  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    };

    

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [visible]);

  const menuCategorias = [
    { id: "estatus", label: "Estatus" },
    { id: "empresa", label: "Empresa" },
    { id: "sitio", label: "Sitio" },
    { id: "proyecto", label: "Proyecto" },
    { id: "categoria", label: "Categoría" },
    { id: "tipoProblema", label: "Tipo Problema" },
  ];

  const [categoriaActiva, setCategoriaActiva] = useState("estatus");

  //console.log("DATA NOMBRES:", proyectosFiltros.nombres);

  const FILTROS_INICIALES = {
  estatus: [],
  empresa: [],
  sitio: [],
  proyecto: [],
  categoria: [],
  estadoSitio: [],
  municipioSitio: [],
  fechaDesde: null,
  fechaHasta: null,
  rangoRapido: null,
  nombreProyecto: [],
  numContrato: [],
  fechaRegistroProyecto: [],
  fechaFinProyecto: [],
  tipoProblema: [],
};

  const [filtros, setFiltros] = useState({
      ...FILTROS_INICIALES,
      ...(filtrosActuales || {})
    });

    useEffect(() => {
  if (!filtrosActuales) return;

  const nuevosFiltros = {
    ...FILTROS_INICIALES,
  };


  if (filtrosActuales.idCategoria && categorias?.length) {
    nuevosFiltros.categoria = categorias.filter(c =>
      filtrosActuales.idCategoria.includes(c.idCategoria)
    );
  }

  if (filtrosActuales.empresa && empresas?.length) {
    nuevosFiltros.empresa = empresas.filter(e =>
      filtrosActuales.empresa.includes(e.idEmpresa)
    );
  }

  if (filtrosActuales.tipoProblema && tipoProblemaFiltros?.length) {
    nuevosFiltros.tipoProblema = tipoProblemaFiltros.filter(t =>
      filtrosActuales.tipoProblema.includes(t.Nombre_problema)
    );
  }

  setFiltros(nuevosFiltros);

}, [filtrosActuales, categorias, empresas, tipoProblemaFiltros]);

  const aplicarRangoRapido = (tipo) => {
  const hoy = new Date();
  let desde = new Date();

  if (tipo === "HOY") {
    desde.setHours(0, 0, 0, 0);
  }

  if (tipo === "7_DIAS") {
    desde = new Date();
    desde.setDate(hoy.getDate() - 6);
  }

  if (tipo === "30_DIAS") {
    desde = new Date();
    desde.setMonth(hoy.getMonth() - 1);
  }

  if (tipo === "ANIO_PASADO") {
    desde = new Date(hoy.getFullYear() - 1, 0, 1);
    const hasta = new Date(hoy.getFullYear() - 1, 11, 31);

    setFiltros({
      ...filtros,
      rangoRapido: tipo,
      fechaDesde: desde.toISOString(),
      fechaHasta: hasta.toISOString(),
    });
    return;
  }

  setFiltros({
    ...filtros,
    rangoRapido: tipo,
    fechaDesde: desde.toISOString(),
    fechaHasta: hoy.toISOString(),
  });
};

  const renderOpciones = () => {

    if (categoriaActiva === "estatus") {

  const estadosConTodos = ["Todos", ...estados];

  const STATUS_COLORS = {
    CREADO: "#DBEAFE",
    ASIGNADO: "#cad3fcff",
    "EN PROCESO": "#fae6c4ff",
    PAUSADO: "#f5ef98ff",
    CERRADO: "#b3b3b3ff",
    COTIZACION: "#F3E8FF",
    RESUELTO: "#DCFCE7",
  };

  return (
    <View>
      <Text style={{ fontWeight: "bold", marginBottom: 10, color: isDark ? "#fff" : theme.text}}>
        Estado del ticket
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {estadosConTodos.map((estado) => {

          const todosSeleccionados = filtros.estatus.length === estados.length;

            const activo =
              estado === "Todos"
                ? filtros.estatus.length === 0 || todosSeleccionados
                : filtros.estatus.includes(estado);

          const color = STATUS_COLORS[estado] || "#D1FAE5";

          return (
            <TouchableOpacity
              key={estado}
              style={{
                padding: 10,
                margin: 5,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: activo ? color : "#fff",
                backgroundColor: activo ? color : theme.card
              }}
              onPress={() => {
                if (estado === "Todos") {
                  setFiltros({
                    ...filtros,
                    estatus: []
                  });
                  return;
                }

                const yaExiste = filtros.estatus.includes(estado);

                let nuevosEstados;

                if (yaExiste) {
                  nuevosEstados = filtros.estatus.filter(e => e !== estado);
                } else {
                  nuevosEstados = [...filtros.estatus, estado];
                }

                setFiltros({
                  ...filtros,
                  estatus: nuevosEstados
                });
              }}
            >
              <Text style={{
                  color: activo ? "#1F2937" : theme.text,
                  fontWeight: activo ? "600" : "400"
                }}
              >{estado}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

    if (categoriaActiva === "categoria") {
      return (
        <SearchSelect
          theme={theme}
          isDark={isDark}
          label="Categoría"
          placeholder="Buscar categoría"
          data={categorias}
          value={filtros.categoria}
          keyField="idCategoria"
          labelField="nombreCategoria"
          onSelect={(categoria) =>
            setFiltros({ ...filtros, categoria })
          }
        />
      );
    }
    


    if (categoriaActiva === "empresa") {
      return (
        <SearchSelect
          theme={theme}
          isDark={isDark}
          label="Nombre de empresa"
          data={empresas}
          value={filtros.empresa}
          keyField="idEmpresa"
          labelField="nombreEmpresa"
          onSelect={(empresa) =>
            setFiltros({ ...filtros, empresa })
          }
        />
      );
    }
    
    if (categoriaActiva === "tipoProblema") {
  return (
    <SearchSelect
      theme={theme}
      isDark={isDark}
      label="Tipo de problema"
      data={tipoProblemaFiltros}
      value={filtros.tipoProblema}
      keyField="Nombre_problema"
      labelField="Nombre_problema"
      onSelect={(val) =>
        setFiltros({ ...filtros, tipoProblema: val })
      }
    />
  );
}
  
    if (categoriaActiva === "proyecto") {
  return (
    <View>

      <SearchSelect
        theme={theme}
        isDark={isDark}
        label="Nombre del proyecto"
        data={proyectosFiltros.nombres}
        value={filtros.nombreProyecto}
        keyField="Nombre"
        labelField="Nombre"
        onSelect={(val) =>
          setFiltros({ ...filtros, nombreProyecto: val })
        }
      />

      <SearchSelect
        theme={theme}
        isDark={isDark}
        label="Número de contrato"
        data={proyectosFiltros.contratos}
        value={filtros.numContrato}
        keyField="NumContrato"
        labelField="NumContrato"
        onSelect={(val) =>
          setFiltros({ ...filtros, numContrato: val })
        }
      />

      {/* <SearchSelect
        theme={theme}
        isDark={isDark}
        label="Fecha registro"
        data={proyectosFiltros.fechasRegistro}
        value={filtros.fechaRegistroProyecto}
        keyField="Fecha_Registro"
        labelField="Fecha_Registro"
        onSelect={(val) =>
          setFiltros({ ...filtros, fechaRegistroProyecto: val })
        }
      /> */}

      <SearchSelect
        theme={theme}
        isDark={isDark}
        label="Fecha fin"
        data={proyectosFiltros.fechasFin}
        value={filtros.fechaFinProyecto}
        keyField="Fecha_Fin"
        labelField="Fecha_Fin"
        onSelect={(val) =>
          setFiltros({ ...filtros, fechaFinProyecto: val })
        }
      />

    </View>
  );
}
    if (categoriaActiva === "sitio") {
  return (
    <View>

      <SearchSelect
        theme={theme}
        isDark={isDark}
        label="Estado"
        data={(estadosGeo || [])
          .map(e => e?.trim())
          .filter(e => e)
          .map(e => ({ estado: e }))
        }
        value={filtros.estadoSitio}
        keyField="estado"
        labelField="estado"

        onSelect={(estadosSeleccionados) => {

  console.log("ESTADOS SELECCIONADOS:", estadosSeleccionados);

  onSelectEstado && onSelectEstado(estadosSeleccionados[0]);

  setFiltros({
    ...filtros,
    estadoSitio: estadosSeleccionados,
    municipioSitio: []
  });

}}
      />

      <SearchSelect
        theme={theme}
        isDark={isDark}
        label="Municipio"
        data={municipios || []}
        value={filtros.municipioSitio}
        keyField="municipio"
        labelField="municipio"
        onSelect={(municipiosSeleccionados) => {

        setFiltros({
          ...filtros,
          municipioSitio: municipiosSeleccionados
        });

        onSelectMunicipio && onSelectMunicipio(municipiosSeleccionados[0]);
      }}
      />
      

      <Text style={{ fontWeight: "bold", marginTop: 20, color: isDark ? "#fff" : theme.text}}>
        Fecha de registro
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {[
          { label: "Hoy", value: "HOY" },
          { label: "7 días", value: "7_DIAS" },
          { label: "Último mes", value: "30_DIAS" },
          { label: "Año pasado", value: "ANIO_PASADO" },
        ].map((item) => {
          const activo = filtros.rangoRapido === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              onPress={() => {
                if (filtros.rangoRapido === item.value) {
                setFiltros({
                  ...filtros,
                  rangoRapido: null,
                  fechaDesde: null,
                  fechaHasta: null,
                });
                } else {
                    aplicarRangoRapido(item.value);
                  }
                }}
                style={{
                padding: 10,
                margin: 5,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: activo ? "#e60023" : "#ccc",
                backgroundColor: activo ? "#ffe5ea" : theme.card
              }}
              
            >
              <Text style={{color: isDark ? "#fff": theme.text}}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}


    return null;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: theme.background }}>

        <View style={{ flexDirection: "row", flex: 1 }}>

          <View style={{ width: 120, backgroundColor: theme.card }}>
            {menuCategorias.map((cat) => {

              const activa = categoriaActiva === cat.id;
              const cantidad = filtros[cat.id]?.length || 0;

              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setCategoriaActiva(cat.id)}
                  style={{
                    padding: 15,
                    backgroundColor: activa 
                      ? (isDark ? theme.primary : theme.background) 
                      : theme.card,
                    borderLeftWidth: activa ? 4 : 0,              
                    borderLeftColor: theme.primary
                  }}
                >
                  <Text style={{ 
                    color: activa 
                      ? "#000"                                   
                      : theme.text,
                    fontWeight: activa ? "700" : "400"    
                  }}>
                    {cat.label} {cantidad > 0 ? `(${cantidad})` : ""}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView style={{ flex: 1, padding: 10, backgroundColor: theme.background }}>
            {renderOpciones()}
          </ScrollView>

        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setFiltros(FILTROS_INICIALES); 

              aplicarFiltros({}); 

            }}
          >
            <Text style={{
              backgroundColor: "#e60023",
              padding: 12,
              borderRadius: 20,
              color: "#fff"
            }}>
              Restablecer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
  style={{
    backgroundColor: "#e60023",
    padding: 12,
    borderRadius: 20
  }}
  onPress={() => {
    
  const params = {};

  if (filtros.estatus.length) {
    params.estatus = filtros.estatus;
  }

  if (filtros.empresa.length) {
    params.empresa = filtros.empresa.map(e => e.idEmpresa);
  }

  if (filtros.categoria.length) {
    params.idCategoria = filtros.categoria
  .filter(c => c && c.idCategoria)
  .map(c => c.idCategoria);
  }

  if (filtros.tipoProblema?.length) {
    params.tipoProblema = filtros.tipoProblema.map(t => t.Nombre_problema);
  }

  if (filtros.estadoSitio.length) {
    params.estadoSitio = filtros.estadoSitio.map(e => e.estado);
  }

  if (filtros.municipioSitio.length) {
    params.municipioSitio = filtros.municipioSitio.map(m => m.municipio);
  }

  if (filtros.nombreProyecto.length) {
    params.nombreProyecto = filtros.nombreProyecto.map(p => p.Nombre);
  }

  if (filtros.numContrato.length) {
    params.numContrato = filtros.numContrato.map(n => n.NumContrato);
  }

  
//   if (filtros.fechaRegistroProyecto.length) {
//   const item = filtros.fechaRegistroProyecto[0];

//   const fecha = item?.Fecha_Registro || item;

//   const fechaFormateada = formatearFecha(fecha);

//   params.fechaFinDesde = fechaFormateada;
//   params.fechaFinHasta = fechaFormateada;
//  }


  if (filtros.fechaFinProyecto.length) {
  const item = filtros.fechaFinProyecto[0];

  const fecha = item?.Fecha_Fin || item;

  const fechaFormateada = formatearFecha(fecha);

  params.fechaFinDesde = fechaFormateada;
  params.fechaFinHasta = fechaFormateada;
}

  if (filtros.fechaDesde) {
    params.fechaDesde = filtros.fechaDesde;
  }

  if (filtros.fechaHasta) {
    params.fechaHasta = filtros.fechaHasta;
  }

  console.log("FILTROS RAW:", filtros.categoria);
console.log("PARAMS FINALES:", JSON.stringify(params, null, 2));
console.log(JSON.stringify(params, null, 2));
console.log("FILTROS RAW:", filtros.categoria);

  aplicarFiltros(params);
  onClose();
}}
>
  <Text style={{ color: "#fff" }}>Ver resultados</Text>
</TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}