import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  BackHandler
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import SearchSelect from "./SearchSelect";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FiltroSitios({
  visible,
  onClose,
  aplicarFiltros,
  sitios = [],
  proyectos = []
}) {

  const { theme, isDark } = useTheme();

  const FILTROS_INICIALES = {
  proyecto: [],
  estado: [],
  municipio: [],
  fechaInicio: null,
  fechaFin: null,
  sitio: []
};

  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [categoriaActiva, setCategoriaActiva] = useState("sitio");
  const [mostrarProyectos, setMostrarProyectos] = useState(false);
  const [mostrarSitios, setMostrarSitios] = useState(false);
  const [mostrarUbicacion, setMostrarUbicacion] = useState(false);
  const [mostrarEstados, setMostrarEstados] = useState(false);
  const [mostrarMunicipios, setMostrarMunicipios] = useState(false);
  const [mostrarFechaInicio, setMostrarFechaInicio] = useState(false);
  const [mostrarFechaFin, setMostrarFechaFin] = useState(false);
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

  const estados = [...new Set(sitios.map(s => s.Estado).filter(Boolean))];

  const municipiosFiltrados = sitios
    .filter(s => filtros.estado.length === 0 || filtros.estado.includes(s.Estado))
    .map(s => s.Municipio);

  const municipios = [...new Set(municipiosFiltrados.filter(Boolean))];

  

  const menuCategorias = [
  { id: "sitio", label: "Sitio" },
  { id: "proyecto", label: "Proyecto" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "fecha", label: "Fecha" },
];

  const toggle = (valor, campo) => {
    const lista = filtros[campo];

    const nuevo = lista.includes(valor)
      ? lista.filter(v => v !== valor)
      : [...lista, valor];

    setFiltros({
      ...filtros,
      [campo]: nuevo
    });
  };

  const renderOpciones = () => {

    const renderItem = (item, campo) => {
      const activo = filtros[campo].includes(item);

      return (
        <TouchableOpacity
          key={item}
          onPress={() => toggle(item, campo)}
          style={{
            padding: 10,
            margin: 5,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: activo ? theme.primary : theme.subText,
            backgroundColor: activo ? theme.primary : theme.card
          }}
        >
          <Text style={{ color: activo ? "#fff" : theme.text }}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    };

    if (categoriaActiva === "proyecto") {
  return (
    <SearchSelect
      theme={theme}
      isDark={isDark}
      label="Nombre del proyecto"
      data={proyectos.map(p => ({ nombre: p }))}
      value={filtros.proyecto.map(p => ({ nombre: p }))}
      keyField="nombre"
      labelField="nombre"
      onSelect={(val) =>
        setFiltros({
          ...filtros,
          proyecto: val.map(v => v.nombre)
        })
      }
    />
  );
}

       if (categoriaActiva === "ubicacion") {
  return (
    <View>

      <SearchSelect
        theme={theme}
        isDark={isDark}
        label="Estado"
        data={estados.map(e => ({ estado: e }))}
        value={filtros.estado.map(e => ({ estado: e }))}
        keyField="estado"
        labelField="estado"
        onSelect={(val) =>
          setFiltros({
            ...filtros,
            estado: val.map(v => v.estado),
            municipio: []
          })
        }
      />

      <SearchSelect
        theme={theme}
        isDark={isDark}
        label="Municipio"
        data={municipios.map(m => ({ municipio: m }))}
        value={filtros.municipio.map(m => ({ municipio: m }))}
        keyField="municipio"
        labelField="municipio"
        onSelect={(val) =>
          setFiltros({
            ...filtros,
            municipio: val.map(v => v.municipio)
          })
        }
      />

    </View>
  );
}

       if (categoriaActiva === "fecha") {

  const aplicarRangoRapido = (tipo) => {
  const hoy = new Date();
  let desde = new Date();
  let hasta = new Date();

  if (tipo === "HOY") {
    desde.setHours(0, 0, 0, 0);
  }

  if (tipo === "7_DIAS") {
    desde.setDate(hoy.getDate() - 6);
  }

  if (tipo === "30_DIAS") {
    desde.setMonth(hoy.getMonth() - 1);
  }

  if (tipo === "1_ANIO") {
    desde.setFullYear(hoy.getFullYear() - 1);
  }

  if (tipo === "MAS_1_ANIO") {
    hasta.setFullYear(hoy.getFullYear() - 1);

    setFiltros({
      ...filtros,
      fechaInicio: null,
      fechaFin: hasta.toISOString()
    });

    return;
  }

  setFiltros({
    ...filtros,
    fechaInicio: desde.toISOString(),
    fechaFin: hoy.toISOString()
  });
};

  return (
    <View>

      <Text style={{ color: theme.text, fontWeight: "bold", marginBottom: 10 }}>
        Rango de fechas
      </Text>

      <TouchableOpacity
        onPress={() => setMostrarFechaInicio(true)}
        style={{
          padding: 12,
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 1,
          backgroundColor: theme.card,
          marginBottom: 10
        }}
      >
        <Text style={{ color: theme.text }}>
          Fecha inicio: {filtros.fechaInicio
            ? filtros.fechaInicio.split("T")[0]
            : "Seleccionar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setMostrarFechaFin(true)}
        style={{
          padding: 12,
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 1,
          backgroundColor: theme.card,
          marginBottom: 10
        }}
      >
        <Text style={{ color: theme.text }}>
          Fecha fin: {filtros.fechaFin
            ? filtros.fechaFin.split("T")[0]
            : "Seleccionar"}
        </Text>
      </TouchableOpacity>

    <Text style={{color: theme.text}}>   Filtrar Fecha Rapido</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {[
          { label: "Hoy", value: "HOY" },
          { label: "7 días", value: "7_DIAS" },
          { label: "30 días", value: "30_DIAS" },
          { label: "1 año", value: "1_ANIO" },
        ].map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => aplicarRangoRapido(item.value)}
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: theme.primary,
              backgroundColor: theme.card
            }}
          >
            <Text style={{ color: theme.text }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {mostrarFechaInicio && (
        <DateTimePicker
          value={filtros.fechaInicio ? new Date(filtros.fechaInicio) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarFechaInicio(false);
            if (selectedDate) {
              setFiltros({
                ...filtros,
                fechaInicio: selectedDate.toISOString()
              });
            }
          }}
        />
      )}

      {mostrarFechaFin && (
        <DateTimePicker
          value={filtros.fechaFin ? new Date(filtros.fechaFin) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarFechaFin(false);
            if (selectedDate) {
              setFiltros({
                ...filtros,
                fechaFin: selectedDate.toISOString()
              });
            }
          }}
        />
      )}

    </View>
  );
}
        if (categoriaActiva === "sitio") {

  const nombres = [...new Set(sitios.map(s => s.Nombre))];

  return (
    <SearchSelect
      theme={theme}
      isDark={isDark}
      label="Nombre del sitio"
      data={nombres.map(n => ({ nombre: n }))}
      value={filtros.sitio.map(n => ({ nombre: n }))}
      keyField="nombre"
      labelField="nombre"
      onSelect={(val) =>
        setFiltros({
          ...filtros,
          sitio: val.map(v => v.nombre)
        })
      }
    />
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
                    let cantidad = 0;

                    if (cat.id === "ubicacion") {
                    cantidad = (filtros.estado?.length || 0) + (filtros.municipio?.length || 0);
                    } else if (cat.id === "fecha") {
                    cantidad = (filtros.fechaInicio || filtros.fechaFin) ? 1 : 0;
                    } else {
                    cantidad = (filtros[cat.id] || []).length;
                    }

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
                            color: activa ? "#000" : theme.text,
                            fontWeight: activa ? "700" : "400"
                        }}>
                            {cat.label} {cantidad > 0 ? `(${cantidad})` : ""}
                        </Text>
                        </TouchableOpacity>
                    );
                    })}
                </View>

                <ScrollView style={{ flex: 1, padding: 10 }}>
                    {renderOpciones()}
                </ScrollView>

                </View>

                <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15
                }}>

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
                    Limpiar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                    aplicarFiltros(filtros);
                    onClose();
                    }}
                >
                    <Text style={{
                    backgroundColor: theme.primary,
                    padding: 12,
                    borderRadius: 20,
                    color: "#fff"
                    }}>
                    Aplicar
                    </Text>
                </TouchableOpacity>

                </View>

            </View>
            </Modal>
        );
        }