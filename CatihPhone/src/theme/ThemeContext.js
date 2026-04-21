import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "../styles/theme/colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [loadingTheme, setLoadingTheme] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme !== null) {
          setIsDark(savedTheme === "dark");
        }
      } catch (error) {
        console.log("Error cargando tema:", error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      setLoadingTheme(true);

      const newValue = !isDark;

      setTimeout(async () => {
        setIsDark(newValue);

        await AsyncStorage.setItem(
          "theme",
          newValue ? "dark" : "light"
        );

        setLoadingTheme(false);
      }, 800);

    } catch (error) {
      console.log("Error:", error);
      setLoadingTheme(false);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, loadingTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);