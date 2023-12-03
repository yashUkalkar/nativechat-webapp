import axios from "axios";

const SERVER_URL =
  import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:6001";

const server = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

const serverPrivate = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { server, serverPrivate };
