import axios from "axios";

export const api = axios.create({
  baseURL: "https://fake-json-api.mock.beeceptor.com/users",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
