import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  StatusBar,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

export default function PuntosConexionScreen() {
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


const dataFiltrada = React.useMemo(() => {
  let resultado = data;

  if (filtroEstado !== "Todos") {
    resultado = resultado.filter(
      item => item.estado === filtroEstado
    );
  }

  if (search.trim() !== "") {
    resultado = resultado.filter(item =>
      item.id.toLowerCase().includes(search.toLowerCase())
    );
  }

  return resultado;
}, [filtroEstado, search, data]);


const ticketsFiltrados = React.useMemo(() => {
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


const esTicket = menuSeleccionado === "Mis\nTickets";
let headerIcon = "wifi-outline";
let headerTitle = "Puntos \nConexión";

if (menuSeleccionado === "Mis\nTickets") {
  headerIcon = "ticket-outline";
  headerTitle = "Mis \nTickets";
}

if (menuSeleccionado === "Nuevo \nTicket") {
  headerIcon = "add-circle-outline";
  headerTitle = "Nuevo \nTicket";
}

const listTitle = esTicket
  ? "Listado de Tickets"
  : "Listado de Puntos \nde Conexión"
const dataMostrar = esTicket ? ticketsFiltrados : dataFiltrada;

const filtroMostrar = esTicket
  ? ["Todos", "Abierto", "Cerrado"]
  : ["Todos", "Activo", "Pendiente"];


const  renderItem = ({ item }) => {
  if (esTicket){
    return (
      <TouchableOpacity style={styles.card}>
        <View style= {[styles.estadoBadge, item.estadoTicket === "Abierto" ? styles.activo : styles.cerrado]}> 
          <Text style={styles.estadoAbierto}>{item.estadoTicket}</Text>
        </View>
          <Text style={styles.codigo}>#{item.id}</Text>

          <Text style={styles.info}>Tipo de Reporte:  (--)</Text>
          <Text style={styles.info}>Asignado a:  (--)</Text>
          <Text style={styles.info}>Fecha de Creación:  (--)</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.estadoBadge, item.estado === "Activo" ? styles.activo : styles.pendiente]}>
        <Text style={styles.estadoText}>{item.estado}</Text>
      </View>
        <Text style={styles.codigo}>#{item.id}</Text>

        <Text style={styles.info}>Total de Tickets: (--)</Text>
        <Text style={styles.info}>Tickets Pendientes: (--)</Text>
        <Text style={styles.info}>Nombre del inmueble: (--)</Text>
        <Text style={styles.info}>Temática: (--)</Text>
        <Text style={styles.info}>Clasificación: (--)</Text>
        <Text style={styles.info}>Municipio: (--)</Text>
    </TouchableOpacity>
  );
}

  return (
    
    <LinearGradient
      colors={["#0076A7", "#003B5C"]}
      style={styles.container}
    >
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.container}>
       
        <View style={styles.header}>
          <View style={[styles.iconCard]}>
          <Icon name={headerIcon} size={35} color="#000000ff"/>
          </View>
          <Text style={[styles.headerTitle, {width: 100}]}>{headerTitle}</Text>
          
           <View style={styles.iconCards}>
           <Icon name="notifications" size={35} color="#000000ff"/>
           </View>
           <View style={[styles.header, {width: 90}]}>
            <View style={[styles.iconCards]}>
            <Icon name="person" size={35} color="#000000ff" />
            </View>
            </View>
             </View>
        <View style={styles.margen}>
        <View style={styles.filtroContainer}>
        </View> 
        
        <FlatList
        data={dataMostrar}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
        ListHeaderComponent={<>
    
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#555" />
        <TextInput
          placeholder="Buscar por ID o Titulo"
          placeholderTextColor="#777"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>

  
      <View style={[styles.cardMenu]}>
       {[
  { label: "Mis\nTickets", icon: "ticket-outline",},
  { label: "Nuevo \nTicket", icon: "add-circle-outline", },
  { label: "Puntos de\nConexión", icon: "wifi-outline", },
].map((item) => (
  <TouchableOpacity
    key={item.label}
    style={[
      styles.MenuButton,
      menuSeleccionado === item.label && styles.menuActivo
    ]}
    onPress={() => {
      if (item.label === "Nuevo \nTicket"){
      setMenuPrevio(menuSeleccionado);
      setMenuSeleccionado(item.label);
      setModalNuevoTicket(true);  
    } else {
      setMenuSeleccionado(item.label)
    }}
  }
  >
    <View style={styles.buttonContent}>
      <Icon
        name={item.icon}
        size={22}
        color={menuSeleccionado === item.label ? "#0076A7" : "#FFFFFF"}
      />
      <Text
        style={[
          styles.MenuText,
          menuSeleccionado === item.label && styles.menuTextActivo
        ]}
      >
        {item.label}
      </Text>
    </View>
  </TouchableOpacity>
))}
</View>

     
      <View style={styles.filtroContainer}>
  <Text style={styles.filtroLabel}>Filtrar:</Text>

  {filtroMostrar.map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.filtroButton,
        (esTicket ? filtroTicket : filtroEstado) === item &&
          styles.filtroActivo
      ]}
      onPress={() =>
        esTicket
          ? setFiltroTicket(item)
          : setFiltroEstado(item)
      }
    >
      <Text
        style={[
          styles.botonActivo,
          (esTicket ? filtroTicket : filtroEstado) === item &&
            styles.filtroTextActivo
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  ))}
</View>


      <View style={styles.TextResul}>
        <Text style={styles.listTitle}>
          {listTitle}
        </Text>
        <Text style={styles.listTitle}>
          Mostrando {dataMostrar.length} resultados
        </Text>
      </View>
      </>
       }
       ListEmptyComponent={
    <View style={styles.emptyContainer}>
      <Icon name="search-outline" size={45} color="#999" />
      <Text style={styles.emptyTitle}>
        {esTicket
          ? "No se encontraron tickets"
          : "No se encontraron puntos de conexión"}
      </Text>
      {search.trim() !== "" && (
        <Text style={styles.emptySubtitle}>
          Intenta con otro ID o Titulo
        </Text>
      )}
    </View>
  }
      />
      

        </View>
      </SafeAreaView>
      <Modal
        transparent
        animationType="fade"
        visible={modalNuevoTicket}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => {
            setModalNuevoTicket(false);
            setMenuSeleccionado(menuPrevio);
          }}
        >
          <TouchableOpacity
            style={styles.modalCard}
            activeOpacity={1}
          >
            <Text style={styles.modalTitle}>
              Selecciona el Tipo de Ticket
            </Text>

            <TouchableOpacity style={styles.modalOption}>
              <Icon name="document-text-outline" size={24} color="#0076A7" />
              <Text style={styles.modalOptionText}>
                Ticket Solicitud
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption}>
              <Icon name="warning-outline" size={24} color="#0076A7" />
              <Text style={styles.modalOptionText}>
                Ticket Falla
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => {
                setModalNuevoTicket(false);
                setMenuSeleccionado(menuPrevio);
              }}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>

          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      </LinearGradient>
      );
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  iconCard: {
  backgroundColor: "#fff",
  width: 60,
  height: 40,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 4,
  marginTop: 25
},
iconCards: {
  backgroundColor: "#fff",
  width: 45,
  height: 45,
  borderRadius: 50,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 10,
  shadowColor: "#000",
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 10,
  marginTop: 25,
},
header: {
  height: 90,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  justifyContent: "space-between",
},
 headerTitle: {
  fontSize: 22,
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: 25,
  marginLeft: 10,
},
margen: {
 paddingHorizontal: 20,
 flex: 1
},
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
    margin: 12
  },
  cardMenu: {
    backgroundColor: "#2680B2",
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: "#000",
  },
  filtroContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  filtroLabel: {
    color: "#fff",
    marginRight: 10,
  },
  filtroButton: {
    backgroundColor: "#0076A7",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginRight: 10,
    marginTop: 5,
    borderColor: "#FFFFFF",
    borderWidth: 1
  },
  filtroActivo: {
    backgroundColor: "#fff",
  },
  filtroTextActivo: {
    color: "#0076A7",
    fontWeight: "500",
  },
  botonActivo:{
    color: "#fff",
  },
  listTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  estadoBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  activo: {
    backgroundColor: "#4CAF50",
  },
  pendiente: {
    backgroundColor: "#FF454C",
  },
  cerrado:{
    backgroundColor: "#979b9cff"
  },
  estadoText: {
    color: "#fff",
    fontWeight: "bold",
  },
  estadoAbierto: {
    color: "#fff",
    fontWeight: "bold",
  },
  codigo: {
    position: "absolute",
    right: 20,
    top: 20,
    fontWeight: "bold",
  },
  info: {
    marginBottom: 5,
    color: "#333",
  },
  buttonContent: {
  flexDirection: "row",
  alignItems: "center",
  gap: 2, 
  height: 30,
  width: 90,
},

MenuText: {
  color: "#fff",
  fontSize: 12,
  textAlign: "center",
},
menuTextActivo: {
  color: "#0076A7",
  fontWeight: "bold",
},
menuActivo: {
  backgroundColor: "#FFFFFF",
},


MenuButton: {
    flex:1,
    backgroundColor: "#0076A7",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 50,
    marginRight: 4,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    marginLeft: 4,
    justifyContent: "center",
  },
TextResul: {
  flexDirection: "row",
  alignItems: "center",
  gap: 20,
  marginTop: 12,
},
emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 30,
},

emptyTitle: {
  marginTop: 15,
  fontSize: 16,
  fontWeight: "600",
  color: "#fff",
},

emptySubtitle: {
  marginTop: 5,
  fontSize: 14,
  color: "#fff",
},
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
},
modalCard:{
  width: "85%",
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 20,
  elevation: 10,
},
modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom:20,
  textAlign: "center",
},
modalOption: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 15,
  borderBottomWidth: 1,
  borderColor: "#eee"
},
modalOptionText: {
  fontSize: 16,
  marginLeft: 15,
},
modalCancel: {
  marginTop: 20,
  backgroundColor: "#0076A7",
  paddingVertical: 12,
  borderRadius: 10,
},
modalCancelText: {
  color:"#fff",
  textAlign: "center",
  fontWeight: "bold",
}
});
