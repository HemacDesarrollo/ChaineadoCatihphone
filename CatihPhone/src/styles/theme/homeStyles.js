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
    marginTop: 16,
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 40,
  },
});
