import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  margen: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10
  },

  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 5,
  },

  list: {
    paddingBottom: 20
  },

  card: {
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    marginRight: 2,
    activeOpacity: 0.8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },

  codigo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4
  },

  infoBase: {
    fontSize: 13,
    flexWrap: "wrap"
  },

  infoBien: {
    fontSize: 13,
    flexWrap: "wrap"
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    backgroundColor: "#fff"
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14
  },

  TextResul: {
    marginBottom: 8
  },

  listTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff"
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 14,
    color: "#888"
  },
  linea: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

});