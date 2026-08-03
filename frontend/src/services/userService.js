import api from "../config/api";

// ==========================
// GET ALL USERS
// ==========================
export const getUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==========================
// CREATE USER
// ==========================
export const createUser = async (data) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==========================
// UPDATE USER
// ==========================
export const updateUser = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await api.put(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==========================
// DELETE USER
// ==========================
export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};