import axios from "axios";

export const APIClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 5000,
  withCredentials: true,
});
