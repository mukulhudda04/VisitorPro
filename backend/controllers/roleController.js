const sql = require("mssql");

// ==========================
// Get All Roles
// ==========================
const getRoles = async (req, res) => {
    try {

        const result = await sql.query(`
            SELECT
                RoleId,
                RoleName
            FROM Roles
            ORDER BY RoleName
        `);

        return res.status(200).json({
            success: true,
            count: result.recordset.length,
            data: result.recordset
        });

    } catch (error) {

        console.error("Get Roles Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }
};

module.exports = {
    getRoles
};