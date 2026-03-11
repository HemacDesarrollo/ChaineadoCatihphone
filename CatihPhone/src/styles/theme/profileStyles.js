import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0076A7",
    paddingTop: 20,
  },
  container: {
    flex: 1,
    marginTop: 5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",      
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    //borderColor: "#16a34a",
    elevation: 2
  },
   avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#0076A7",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    //borderColor: "#16a34a",
    elevation: 2
  },
  cameraIconContainer: {
  position: "absolute",
  bottom: -20,  
  //left: "50%",               
  transform: [{ translateX: 37 }], 
  backgroundColor: "#0076A7",
  borderRadius: 20,
  padding: 6,
  borderWidth: 2,
  borderColor: "#fff",
},
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  position: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    color: "white",
    fontSize: 12,
  },
  statusOnline: {
    backgroundColor: "#16a34a",
  },
  statusBusy: {
    backgroundColor: "#dc2626",
  },
  statusAway: {
    backgroundColor: "#f59e0b",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  permissionItem: {
    color: "#000",
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: "#FF4D4F",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  logoutTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  statsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
},
statBox: {
  flex: 1,
  backgroundColor: "#f3f4f6",
  borderRadius: 12,
  paddingVertical: 15,
  paddingHorizontal: 5,
  alignItems: "center",
  marginHorizontal: 5,
},
statLabel: {
  fontSize: 12,
  color: "#6b7280",
  marginTop: 5,
},
statValue: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#111827",
  marginTop: 3,
},
cardInformacion: {
    backgroundColor: "#f3f4f6",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    marginTop: 12
  },
infoRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 12,
},
infoIcon: {
  marginRight: 10,
},
infoText: {
  fontSize: 12,
  flex: 1,
  textAlign: "left",
  color: "#000",
  marginBottom: 5,
},
logout: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15
    },
    logoutText: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: "600",
        color: "#FF4D4F",
    },
    statusCircle: {
      position: "absolute",
      bottom: 5,
      right: 5,
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#fff",
    },
    avatarBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default profileStyles;