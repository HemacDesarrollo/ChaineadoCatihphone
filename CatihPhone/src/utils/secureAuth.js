import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

export const saveCredentials = async (user, password) => {
  await SecureStore.setItemAsync("CATI_user", user);
  await SecureStore.setItemAsync("CATI_pass", password);
};

export const getCredentials = async () => {
  const user = await SecureStore.getItemAsync("CATI_user");
  const pass = await SecureStore.getItemAsync("CATI_pass");
  return { user, pass };
};

export const canUseBiometrics = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return hasHardware && enrolled;
};

export const authenticateBiometric = async () => {
  return await LocalAuthentication.authenticateAsync({
    promptMessage: "Ingresa con tu huella",
    fallbackLabel: "Usar contraseña",
  });
};
