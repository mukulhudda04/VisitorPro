import api from "../config/api";

export const checkInVisitor = async (data) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/visits/checkin", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const checkOutVisitor = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/visits/checkout/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getActiveVisits = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/visits/active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getVisitHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/visits/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
