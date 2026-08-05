import api from "../config/api";

// ==========================
// GET ALL ROLES
// ==========================
export const getRoles = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/roles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};