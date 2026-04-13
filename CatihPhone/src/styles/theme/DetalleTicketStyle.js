import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 36,

  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  scrollContainer: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },

  ticketId: {
    fontWeight: "bold",
    fontSize: 16,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 4,
    color: "#003B5C",
  },

  infoText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 2,
  },

  divider: {
    height: 1,
    borderBottomWidth: 1,
    backgroundColor: "#000",
    marginVertical: 12,
  },
  bottonText: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 12,
    paddingTop: 12,
  },
  bottonContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 24,
    width: 120,
    marginBottom: 2,
    alignItems: "center"
  }, topRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

infoRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  marginBottom: 8,
},

description: {
  marginTop: 5,
  color: "#444",
},

buttonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
},

btnPrimary: {
  backgroundColor: "#3b82f6",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
},

btnDanger: {
  backgroundColor: "#ef4444",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
},

btnText: {
  color: "#fff",
  fontWeight: "bold",
},

});

export default styles;