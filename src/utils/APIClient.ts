import axios from "axios";

export const APIClient = axios.create({
  baseURL: `${process.env.REACT_APP_WEB_SERVER_URI}/api/v1`,
  withCredentials: true,
});
