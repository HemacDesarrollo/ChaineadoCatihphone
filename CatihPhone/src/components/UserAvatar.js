import React, { useContext } from "react";
import { View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../api/connect";

export default function UserAvatar() {
  const { user } = useContext(AuthContext);


  if (!user?.Fotografia) {
    return (
      <Ionicons name="person" size={24} color="#0076A7" />
    );
  }

  return (
    <Image
      source={{
        uri: `${API_BASE_URL}${user.Fotografia}?t=${Date.now()}`,
      }}
      style={{
        width: "100%",
        height: "100%",
        resizeMode: "cover",
      }}
    />
  );
}