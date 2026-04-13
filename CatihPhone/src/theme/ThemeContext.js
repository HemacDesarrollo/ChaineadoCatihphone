import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "../styles/theme/colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);


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
      const newValue = !isDark;
      setIsDark(newValue);

      await AsyncStorage.setItem(
        "theme",
        newValue ? "dark" : "light"
      );
    } catch (error) {
      console.log("Error guardando tema:", error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);