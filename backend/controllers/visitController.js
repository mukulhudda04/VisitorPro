const sql = require("mssql");

// ==========================
// CHECK-IN VISITOR
// ==========================
const checkInVisitor = async (req, res) => {
    try {
        const {
            VisitorId,
            EmployeeName,
            Department,
            Purpose,
            Remarks
        } = req.body;

        const result = await sql.query`
            EXEC sp_CheckInVisitor
                @VisitorId = ${VisitorId},
                @EmployeeName = ${EmployeeName},
                @Department = ${Department},
                @Purpose = ${Purpose},
                @Remarks = ${Remarks}
        `;

        res.status(201).json({
            success: true,
            message: "Visitor checked in successfully",
            VisitId: result.recordset[0].VisitId
        });

    } catch (error) {
        console.error("Check-In Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================
// CHECK-OUT VISITOR
// ==========================
const checkOutVisitor = async (req, res) => {
    try {
        const { id } = req.params;

        await sql.query`
            EXEC sp_CheckOutVisitor
                @VisitId = ${id}
        `;

        res.status(200).json({
            success: true,
            message: "Visitor checked out successfully"
        });

    } catch (error) {
        console.error("Check-Out Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================
// ACTIVE VISITS
// ==========================
const getActiveVisits = async (req, res) => {
    try {
        const result = await sql.query(`
            EXEC sp_GetActiveVisits
        `);

        res.status(200).json({
            success: true,
            count: result.recordset.length,
            data: result.recordset
        });

    } catch (error) {
        console.error("Active Visits Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================
// VISIT HISTORY
// ==========================
const getVisitHistory = async (req, res) => {
    try {
        const result = await sql.query(`
            EXEC sp_GetVisitHistory
        `);

        const data = result.recordset.map((visit) => ({
            ...visit,

            CheckInTime: visit.CheckInTime
                ? new Date(
                    new Date(visit.CheckInTime).getTime() +
                    (330 * 60 * 1000)
                )
                : null,

            CheckOutTime: visit.CheckOutTime
                ? new Date(
                    new Date(visit.CheckOutTime).getTime() +
                    (330 * 60 * 1000)
                )
                : null
        }));

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {
        console.error("Visit History Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================
// DELETE SINGLE VISIT HISTORY
// ADMIN ONLY
// ==========================
const deleteVisitHistory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                success: false,
                message: "Invalid Visit ID."
            });
        }

        const request = new sql.Request();

        request.input("VisitId", sql.Int, Number(id));

        const result = await request.query(`
            DELETE FROM Visits
            WHERE VisitId = @VisitId
        `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                success: false,
                message: "Visit history record not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Visit history deleted successfully."
        });

    } catch (error) {
        console.error("Delete Visit History Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================
// DELETE MULTIPLE VISIT HISTORY
// ADMIN ONLY
// ==========================
const deleteMultipleVisitHistory = async (req, res) => {
    try {
        const { visitIds } = req.body;

        if (
            !Array.isArray(visitIds) ||
            visitIds.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one Visit ID."
            });
        }

        const validIds = visitIds
            .map(Number)
            .filter((id) => Number.isInteger(id) && id > 0);

        if (validIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid Visit IDs provided."
            });
        }

        const request = new sql.Request();

        const placeholders = validIds.map((id, index) => {
            const parameterName = `VisitId${index}`;

            request.input(
                parameterName,
                sql.Int,
                id
            );

            return `@${parameterName}`;
        });

        const result = await request.query(`
            DELETE FROM Visits
            WHERE VisitId IN (${placeholders.join(", ")})
        `);

        const deletedCount = result.rowsAffected[0] || 0;

        res.status(200).json({
            success: true,
            message: `${deletedCount} visit ${
                deletedCount === 1 ? "record" : "records"
            } deleted successfully.`,
            deletedCount
        });

    } catch (error) {
        console.error(
            "Delete Multiple Visit History Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================
// EXPORTS
// ==========================
module.exports = {
    checkInVisitor,
    checkOutVisitor,
    getActiveVisits,
    getVisitHistory,
    deleteVisitHistory,
    deleteMultipleVisitHistory
};