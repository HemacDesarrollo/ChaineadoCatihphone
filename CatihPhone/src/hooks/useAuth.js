import { useState, useEffect, useRef } from "react";
import { AppState } from "react-native";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { api } from "../api/connect";

export function useAuth() {

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("EN LINEA");
  const [loading, setLoading] = useState(true);
  const [sesionExpired, setSesionExpired] = useState(false);

  const userRef = useRef(user);
  const statusRef = useRef(status);

  const logoutTimer = useRef(null);
  const inactivityTimer = useRef(null);
  const lastInteraction = useRef(0);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const updateStatus = (newStatus) => {
    setStatus((prev) => {
      if (prev === newStatus) return prev;
      return newStatus;
    });
  };

  const setOnline = async () => {
    if (!userRef.current) return;
    if (statusRef.current === "EN LINEA") return;

    updateStatus("EN LINEA");

    try {
      await api.put("/APP/usuarios/estatus", {
        Estatus: "EN LINEA",
      });
    } catch {}
  };

  const setAway = async () => {
    if (!userRef.current) return;
    if (statusRef.current === "AUSENTE") return;

    updateStatus("AUSENTE");

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
      if (statusRef.current === "EN LINEA") {
        setAway();
      }
    }, 60000);
  };

  const registerInteraction = () => {

    const now = Date.now();

    if (now - lastInteraction.current < 1500) return;

    lastInteraction.current = now;

    if (!userRef.current) return;

    resetInactivityTimer();

    if (statusRef.current !== "EN LINEA") {
      setOnline();
    }
  };

  useEffect(() => {

    global.__REGISTER_INTERACTION__ = registerInteraction;

    return () => {
      global.__REGISTER_INTERACTION__ = null;

      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };

  }, []);

  useEffect(() => {

    const subscription = AppState.addEventListener("change", async (state) => {

      if (state === "active") {
          const token = await SecureStore.getItemAsync("CATI_token");

          if (token) {
            const decoded = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);

            if (decoded.exp <= now) {
              await clearSession(true);
              return;
            }
          }
          registerInteraction();
      } else {
        setAway();
      }
 
    });

    return () => subscription.remove();

  }, []);

  const loginUser = async (token) => {

    await SecureStore.setItemAsync("CATI_token", token);

    const decoded = jwtDecode(token);
    const response = await api.get("/APP/usuarios/me");

    setUser({
      token,
      ...decoded,
      ...response.data,
    });

    updateStatus("EN LINEA");

    try {
      await api.put("/APP/usuarios/estatus", {
        Estatus: "EN LINEA",
      });
    } catch {}

    scheduleAutoLogout(token);
    resetInactivityTimer();
  };

  const updateUserData = (data) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, ...data };
    });
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
    } catch {}

    await SecureStore.deleteItemAsync("CATI_token");

    setUser(null);
    setStatus("DESCONECTADO");

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
          setStatus("DESCONECTADO");

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

            updateStatus("EN LINEA");

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

        const statusCode = error.response?.status;
        const url = error.config?.url;

        if (
          userRef.current &&
          (statusCode === 401 || statusCode === 403) &&
          url &&
          !url.includes("/auth/login")
        ) {
          await clearSession(true);
        }

        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);

  }, []);

  return {
    user,
    status,
    loading,
    sesionExpired,
    setSesionExpired,
    loginUser,
    logout,
    registerInteraction,
    updateUserData,
  };
}