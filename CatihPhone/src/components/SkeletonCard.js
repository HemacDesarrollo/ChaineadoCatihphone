import React from "react";
import { View } from "react-native";

export default function SkeletonCard({ theme, isDark }) {
  const baseColor = isDark ? "#2A2A2A" : "#E0E0E0";

  return (
    <View
      style={{
        backgroundColor: theme.card,
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        opacity: 0.7,
        borderLeftWidth: 8,
        borderLeftColor: "#2176AE"
      }}
    >
      <View
        style={{
          height: 16,
          backgroundColor: baseColor,
          borderRadius: 6,
          marginBottom: 10,
          width: "50%"
        }}
      />

      <View
        style={{
          height: 12,
          backgroundColor: baseColor,
          borderRadius: 6,
          marginBottom: 6,
          width: "80%"
        }}
      />

      <View
        style={{
          height: 12,
          backgroundColor: baseColor,
          borderRadius: 6,
          marginBottom: 6,
          width: "60%"
        }}
      />

      <View
        style={{
          height: 12,
          backgroundColor: baseColor,
          borderRadius: 6,
          width: "40%"
        }}
      />
    </View>
  );
}