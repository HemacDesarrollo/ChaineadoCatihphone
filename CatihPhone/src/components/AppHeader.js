import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../theme/ThemeContext";
import LottieView from "lottie-react-native";

export default function AppHeader({ title, titleComponent, onNotificationPress }) {
  const { toggleTheme, isDark, theme, loadingTheme } = useTheme();

  return (
    <>
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
        ) : (
          <Text
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
                color="#FFD700"
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

      {loadingTheme && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            backgroundColor: isDark
              ? "rgba(0,0,0,0.7)"
              : "rgba(0,0,0,0.5)",

            justifyContent: "center",
            alignItems: "center",

            zIndex: 999,
            elevation: 999,
          }}
        >
          <LottieView
            source={require("../assets/animations/loading.json")}
            autoPlay
            loop={false}
            style={{ width: 140, height: 140 }}
          />
        </View>
      )}
    </>
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