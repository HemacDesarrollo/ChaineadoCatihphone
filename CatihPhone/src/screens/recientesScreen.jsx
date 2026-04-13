import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { useTheme } from "../theme/ThemeContext";
import BottomMenu from "../components/BottonMenu";
import { useRecientesViewModel } from "../viewmodels/useRecientesViewModel";


export default function RecientesScreen() {
  const { theme, isDark } = useTheme();
  const vm = useRecientesViewModel();
  const insets = useSafeAreaInsets();
  

  
  if (vm.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#1B4F8A" />
      </View>
    );
  }

  return (
    <LinearGradient colors={
    isDark
      ? ["#0F172A", "#1E293B"]
      : ["#2176AE", "#c7ddf5ff"]
  } style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={{ flex: 1 }}>

       <AppHeader
  titleComponent={
      <Image
        source={require("../assets/imagen/logoTipo_b.png")}
        style={{
          width: 140,
          height: 60,
          resizeMode: "contain",
          marginTop: 25,
        }}
      />
    }
  />

        <View style={{ flex: 1 }}>


  <View style={{ flex: 1 }}>
    
    <Text style={[styles.tituloSeccion, { color: theme.textTitle }]}>
      Actividad reciente
    </Text>

    <FlatList
  data={vm.recientes}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => <ItemActividad item={item}  theme={theme} isDark={isDark}/>}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ padding: 10 }}

  ListEmptyComponent={
    <View style={styles.emptyContainer}>
      
      <LottieView
        source={require("../assets/animations/ProyectoVacio.json")}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />

      <Text style={styles.emptyText}>
        No se encontraron tickets
      </Text>

    </View>
  }
/>

  </View>

 
  <View style={{ flex: 1 }}>
    
    <Text style={[styles.tituloSeccion, { color: theme.textTitle }]}>
      Mis proyectos
    </Text>

    <FlatList
  data={vm.proyectos || []}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => <ItemProyecto item={item} theme={theme} isDark={isDark}/>}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ padding: 10 }}

  ListEmptyComponent={
    <View style={styles.emptyContainer}>
      
      <LottieView
        source={require("../assets/animations/ProyectoVacio.json")}
        autoPlay
        loop
        style={{ width: 120, height: 120 }}
      />

      <Text style={styles.emptyText}>
        No tienes proyectos activos
      </Text>

    </View>
  }
/>

  </View>

</View>

        <BottomMenu />
      </SafeAreaView>
    </LinearGradient>
  );
}

const ItemActividad = ({ item, theme, isDark }) => {
    const navigation = useNavigation();
    const ItemProyecto = ({ item, theme }) => {
      return (
        <View style={[styles.cardProyecto, { backgroundColor: theme.card }]}>
          <Text style={{ fontWeight: "bold", color: theme.text }}>
            {item.nombreProyecto}
          </Text>

          <Text style={{ color: theme.subText }}>
            {item.descripcion || "Proyecto activo"}
          </Text>
        </View>
      );
    };
    const getIcon = () => {
    switch (item.estatus) {
        case "ASIGNADO":
        return "person-circle-outline";

        case "CERRADO":
        return "close-circle-outline";

        case "CREADO":
        return "document-text-outline";

        case "EN PROCESO":
        return "sync-outline";

        case "COTIZACION":
        return "cash-outline";

        case "RESUELTO":
        return "checkmark-circle-outline";

        case "PAUSADO":
        return "pause";

        default:
        return null; 
    }
    };
  const getColor = () => {
    switch (item.estatus) {
      case "ASIGNADO":
        return "#6366f1";
      case "CERRADO":
        return "#6b7280";
      case "CREADO":
        return "#3b82f6"
      case "EN PROCESO":
        return "#f59e0b"
      case "COTIZACION":
        return "#a855f7"
      case "RESUELTO":
        return "#16a34a"
      case "PAUSADO":
        return "#cabd0aff"
      default:
        return "#6b7280";
    }
    
  };

 
  return (
    <TouchableOpacity
    activeOpacity={0.8}
    onPress={() =>
      navigation.navigate("DetalleTicket", {
        ticket: item,
      })
    }
  >

    <View
      style={[
        styles.card,
        {
          borderColor: getColor(),
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          elevation: 3,
          backgroundColor: theme.card,
          //borderColor: isDark ? "#334155" : "#E5E7EB"
        },
      ]}
    >
    
    

  {getIcon() && (
    <View style={[styles.iconBox, {backgroundColor:getColor()}]}>
        <Icon name={getIcon()} size={20} color="#fff"></Icon>
    </View>
  )}
  

  <View style={{ flex: 1}}>
    <View style={{flexDirection: "row",justifyContent: "space-between"}}>
        <View style={[styles.estadoBadge, { backgroundColor: getColor()}]}>
            <Text style={styles.estadoText}>{item.estatus}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[styles.codigo,  { color: theme.text }]}>#HE-{item.idTicket}</Text>
        </View>
    </View>
    <View style={{flexDirection: "row"}}>
        <Icon name="folder-open" size={18}  color={theme.icon}/>
        <Text style={[styles.codigo,  { color: theme.text }]}> {item.tipoReporte}</Text>
    </View>
      
    <View style={{flexDirection: "row"}}>
        <Icon name="person" size={18} color={theme.icon}/>
       <Text style={[styles.codigo,  { color: theme.text }]}> {item.usuario_atiende}</Text>
    </View>

    
    </View>

  </View>
  </TouchableOpacity>
    );
    };

const styles = {
  header: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#1B4F8A",
    justifyContent:"space-between"
  },

  headerTitle: {
    fontSize: 22,
     color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
    marginLeft: 10,
  },

  contHeader: {
    justifyContent:"center",
    flexDirection: "row",
    alignItems: "center",
    gap: 22
  },

  fondoIcono: {
    backgroundColor: "#2176AE",
    height: 36,
    width: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },

  card: {
    backgroundColor: "#F0F4F8",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  estadoBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 2,
  },

  estadoText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },

  codigo: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  titulo: {
    color: "#333",
  },
  iconBox: {
  width: 45,
  height: 45,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},
tituloSeccion: {
  fontSize: 16,
  fontWeight: "bold",
  marginLeft: 16,
  marginTop: 5,
  color: "#000",
},

cardProyecto: {
  backgroundColor: "#fff",
  padding: 12,
  marginBottom: 10,
  borderRadius: 10,
  elevation: 2,
},
emptyContainer: {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 30,
},

emptyText: {
  marginTop: 10,
  fontSize: 14,
  color: "#fff",
},

};