import { useState, useEffect, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { api } from "../api/connect";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sesionExpired, setSesionExpired] = useState(false);
  const logoutTimer = useRef(null);

  const clearSession = async (expired = false) => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
    await SecureStore.deleteItemAsync("CATI_token");
    setUser(null);
    if (expired) setSesionExpired(true);
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

  const loginUser = async (token) => {
    await SecureStore.setItemAsync("CATI_token", token);
    setUser({ token });
    scheduleAutoLogout(token);
  };

  const logout = async () => {
    await clearSession(false);
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
            await clearSession(false);
          } else {
            setUser({ token });
            scheduleAutoLogout(token);
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

      if ( user &&
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
}, []);


  return {
    user,
    loading,
    sesionExpired,
    setSesionExpired,
    loginUser,
    logout,
  };
}
