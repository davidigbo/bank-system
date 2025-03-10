import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = (data) => Api.post("/register", data);
export const login = (data) => Api.post("/login", data);
export const logout = () => Api.post("/logout");
export const user = () => Api.get("/user");
export const deposit = (data, token) => API.post('/deposit', data, { headers: { Authorization: `Bearer ${token}` } });
export const withdraw = (data, token) => API.post('/withdraw', data, { headers: { Authorization: `Bearer ${token}` } });
export const transfer = (data, token) => API.post('/transfer', data, { headers: { Authorization: `Bearer ${token}` } });
export const transactions = (token) => API.get('/transactions', { headers: { Authorization: `Bearer ${token}` } });