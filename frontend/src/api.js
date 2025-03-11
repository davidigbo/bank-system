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
export const deposit = (data, token) => 
  Api.post("/deposit", data, { headers: { Authorization: `Bearer ${token}` } });
export const withdraw = (data, token) => 
  Api.post("/withdraw", data, { headers: { Authorization: `Bearer ${token}` } });
export const transfer = (data, token) => 
  Api.post("/transfer", data, { headers: { Authorization: `Bearer ${token}` } });
export const getTransactions = async (token) => {
  const response = await Api.get("/transactions", { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
