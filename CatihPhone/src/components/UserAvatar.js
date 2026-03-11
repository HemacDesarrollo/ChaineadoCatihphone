import React, { useContext, useMemo } from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../api/connect";

function UserAvatar() {

  const { user } = useContext(AuthContext);

  const imageUri = useMemo(() => {
    if (!user?.Fotografia) return null;
    return `${API_BASE_URL}${user.Fotografia}`;
  }, [user?.Fotografia]);

  if (!imageUri) {
    return <Ionicons name="person" size={24} color="#0076A7" />;
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={{
        width: "100%",
        height: "100%",
        resizeMode: "cover",
      }}
      fadeDuration={0}
    />
  );
}

export default React.memo(UserAvatar);