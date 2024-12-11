import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const signup = (formData) => API.post("/users/signup", formData);
export const login = (formData) => API.post("/users/login", formData);
export const fetchApplications = () => API.get("/applications");
export const addApplication = (formData) => API.post("/applications", formData);
export const updateApplication = (id, formData) =>
  API.put(`/applications/${id}`, formData);
export const deleteApplication = (id) => API.delete(`/applications/${id}`);
export const getAllUsers = () => API.get("/admin/users");
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
