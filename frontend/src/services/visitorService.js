import api from "../config/api";

// ==============================
// Get All Visitors
// ==============================
export const getVisitors = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/visitors", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==============================
// Create Visitor
// ==============================
export const createVisitor = async (data) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/visitors", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==============================
// Update Visitor
// ==============================
export const updateVisitor = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await api.put(`/visitors/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==============================
// Delete Visitor
// ==============================
export const deleteVisitor = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/visitors/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};