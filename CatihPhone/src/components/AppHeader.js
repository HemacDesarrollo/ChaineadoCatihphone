import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../theme/ThemeContext";

export default function AppHeader({ title, titleComponent, onNotificationPress }) {
  const { toggleTheme, isDark, theme } = useTheme();

  return (
    <View
      style={{
        height: 90,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        backgroundColor: theme.header,
      }}
    >
      {titleComponent ? (
        titleComponent
      ) : ( <Text
          style={{
          fontSize: 22,
          color: "#fff",
          fontWeight: "bold",
          marginTop: 25,
        }}
      >
        {title}
      </Text>
      )}

      <View style={{ flexDirection: "row", gap: 16 }}>


        <TouchableOpacity onPress={toggleTheme}>
          <View style={styles.iconBox}>
            <Icon
              name={isDark ? "moon" : "sunny"}
              size={26}
              color={isDark ? "#FFD700" : "#FFD700"}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNotificationPress}>
          <View style={styles.iconBox}>
            <Icon name="notifications" size={26} color="#fff" />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = {
  iconBox: {
    backgroundColor: "#2176AE",
    height: 36,
    width: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
};