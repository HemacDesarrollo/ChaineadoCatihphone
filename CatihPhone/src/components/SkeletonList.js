import React from "react";
import { View } from "react-native";
import SkeletonCard from "./SkeletonCard";

export default function SkeletonList({ theme, isDark, cantidad = 6 }) {
  return (
    <View style={{ padding: 10 }}>
      {Array.from({ length: cantidad }).map((_, index) => (
        <SkeletonCard key={index} theme={theme} isDark={isDark} />
      ))}
    </View>
  );
}