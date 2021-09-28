import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import localforage from "localforage";

const localStorageStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: "api-cache",
});

const cache = setupCache({
  maxAge: 24 * 60 * 60 * 1000,
  store: localStorageStore,
  debug: false,
  exclude: {
    query: false,
  },
});

const api = axios.create({
  adapter: cache.adapter,
  baseURL: "https://api.trustedshops.com/rest/public/v2",
});

export default api;
