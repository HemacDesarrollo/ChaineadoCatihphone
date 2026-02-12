import axios from "axios";

// Definir las URLs base
const BASE_URLS = {
  produccion: "http://192.168.44.179:3003",
  desarrollo: "https://red.jalisco.gob.mx/panel-dev-api"
};

// Instancia principal (por ejemplo, para panel)
const api = axios.create({
  baseURL: BASE_URLS.desarrollo,
});
const apiDev = axios.create({
  baseURL: BASE_URLS.produccion,
});
export {api, apiDev};
