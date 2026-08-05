const sql = require("mssql");

// ==========================
// Get All Departments
// ==========================
const getDepartments = async (req, res) => {
    try {

        const result = await sql.query(`
            SELECT
                DepartmentId,
                DepartmentName
            FROM Departments
            ORDER BY DepartmentName
        `);

        return res.status(200).json({
            success: true,
            count: result.recordset.length,
            data: result.recordset
        });

    } catch (error) {

        console.error("Get Departments Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }
};

module.exports = {
    getDepartments
};