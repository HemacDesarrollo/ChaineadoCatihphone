import { useState, useEffect, useRef } from "react";
import { AppState } from "react-native";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { api } from "../api/connect";

export function useAuth() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sesionExpired, setSesionExpired] = useState(false);

  const logoutTimer = useRef(null);
  const inactivityTimer = useRef(null);


  const updateUserStatus = (estatus) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, Estatus: estatus };
    });
  };

  const updateUserData = (data) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, ...data };
    });
  };


  const setOnline = async () => {
    if (!user) return;
    if (user.Estatus === "EN LINEA") return;

    updateUserStatus("EN LINEA");

    try {
      await api.put("/APP/usuarios/estatus", {
        Estatus: "EN LINEA",
      });
    } catch {}
  };


  const setAway = async () => {
    if (!user) return;
    if (user.Estatus === "AUSENTE") return;

    updateUserStatus("AUSENTE");

    try {
      await api.put("/APP/usuarios/estatus", {
        Estatus: "AUSENTE",
      });
    } catch {}
  };


  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      setAway();
    }, 60000);
  };


 const lastInteraction = useRef(0);

const registerInteraction = () => {

  const now = Date.now();

  if (now - lastInteraction.current < 1500) return;

  lastInteraction.current = now;

  if (!user) return;

  if (user.Estatus === "AUSENTE") {
    setOnline();
  }

  resetInactivityTimer();
};


  useEffect(() => {

    global.__REGISTER_INTERACTION__ = registerInteraction;

    resetInactivityTimer();

    return () => {
      global.__REGISTER_INTERACTION__ = null;

      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };

  }, [user]);


  useEffect(() => {

    const subscription = AppState.addEventListener("change", (state) => {

      if (state === "active") {
        registerInteraction();
      } else {
        setAway();
      }

    });

    return () => subscription.remove();

  }, [user]);


  const loginUser = async (token) => {

    await SecureStore.setItemAsync("CATI_token", token);

    const decoded = jwtDecode(token);
    const response = await api.get("/APP/usuarios/me");

    setUser({
      token,
      ...decoded,
      ...response.data,
      Estatus: "EN LINEA",
    });

    try {
      await api.put("/APP/usuarios/estatus", {
        Estatus: "EN LINEA",
      });
    } catch {}

    scheduleAutoLogout(token);
    resetInactivityTimer();

  };


  const clearSession = async (expired = false) => {

    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }

    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = null;
    }

    try {
      await api.put("/APP/usuarios/estatus", {
        Estatus: "DESCONECTADO"
      });
    } catch {
      console.log("No se pudo marcar como DESCONECTADO");
    }

    await SecureStore.deleteItemAsync("CATI_token");

    setUser(null);

    if (expired) {
      setSesionExpired(true);
    }

  };


  const logout = async () => {
    await clearSession(false);
  };


  const scheduleAutoLogout = (token) => {

    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpire = decoded.exp - now;

    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }

    if (timeUntilExpire <= 0) {
      clearSession(true);
      return;
    }

    logoutTimer.current = setTimeout(() => {
      clearSession(true);
    }, timeUntilExpire * 1000);

  };


  useEffect(() => {

    const restoreSession = async () => {

      try {

        const token = await SecureStore.getItemAsync("CATI_token");

        if (!token) {
          setUser(null);
        } else {

          const decoded = jwtDecode(token);
          const now = Math.floor(Date.now() / 1000);

          if (decoded.exp <= now) {

            await clearSession(true);

          } else {

            const response = await api.get("/APP/usuarios/me");

            setUser({
              token,
              ...decoded,
              ...response.data,
            });

            scheduleAutoLogout(token);
            resetInactivityTimer();

          }

        }

      } catch {

        await clearSession(false);

      } finally {

        setLoading(false);

      }

    };

    restoreSession();

  }, []);


  useEffect(() => {

    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {

        const status = error.response?.status;
        const url = error.config?.url;

        if (
          user &&
          (status === 401 || status === 403) &&
          url &&
          !url.includes("/auth/login")
        ) {
          await clearSession(true);
        }

        return Promise.reject(error);

      }
    );

    return () => api.interceptors.response.eject(interceptor);

  }, [user?.token]);


  return {
    user,
    loading,
    sesionExpired,
    setSesionExpired,
    loginUser,
    logout,
    updateUserStatus,
    updateUserData,
    registerInteraction,
  };

}