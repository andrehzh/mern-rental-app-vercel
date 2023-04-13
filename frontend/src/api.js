import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-rental-app-vercel-server.vercel.app",
});

export default api;
