import api from "../config/api";

export const getVisitHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/visits/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
