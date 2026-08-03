import api from "../config/api";

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};