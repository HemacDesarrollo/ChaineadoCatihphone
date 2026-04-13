import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: { flex: 1 },
  safe: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 1,
    textShadowColor: "rgba(117, 0, 252, 1)",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  subtitle: {
    marginTop: 35,
    fontSize: 24,
    color: "#fff",
    marginBottom: 40,
    textShadowColor: "rgba(13, 92, 211, 1)",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },


});
