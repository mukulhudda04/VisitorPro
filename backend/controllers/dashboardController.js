const sql = require("mssql");

// ==========================
// DASHBOARD STATS
// ==========================
const getDashboardStats = async (req, res) => {
    try {

        const result = await sql.query(`
            EXEC sp_GetDashboardStats
        `);

        res.status(200).json({
            success: true,
            data: result.recordset[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getDashboardStats
};