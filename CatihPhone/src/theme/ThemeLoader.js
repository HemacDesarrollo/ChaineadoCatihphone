import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "../theme/ThemeContext";

export default function ThemeLoader() {
  const { loadingTheme, isDark } = useTheme();

  if (!loadingTheme) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "absolute",

        backgroundColor: isDark
          ? "rgba(0,0,0,0.7)"
          : "rgba(0,0,0,0.5)",

        justifyContent: "center",
        alignItems: "center",

        zIndex: 9999,
        elevation: 9999,
      }}
      pointerEvents="auto"
    >
      <View
        style={{
          backgroundColor: isDark ? "#1E293B" : "#fff",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <LottieView
          source={require("../assets/animations/loading.json")}
          autoPlay
          loop
          style={{ width: 180, height: 180 }}
        />
      </View>
    </View>
  );
}