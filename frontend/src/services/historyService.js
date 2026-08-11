import api from "../config/api";

// ==========================
// GET VISIT HISTORY
// ==========================
export const getVisitHistory = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/visits/history", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};


// ==========================
// DELETE SINGLE HISTORY
// ==========================
export const deleteVisitHistory = async (visitId) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(
        `/visits/history/${visitId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// ==========================
// DELETE MULTIPLE HISTORY
// ==========================
export const deleteMultipleVisitHistory = async (visitIds) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(
        "/visits/history",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                visitIds,
            },
        }
    );

    return response.data;
};