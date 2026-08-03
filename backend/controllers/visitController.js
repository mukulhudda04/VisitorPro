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

        const data = result.recordset.map((visit) => ({
            ...visit,
            CheckInTime: visit.CheckInTime
                ? new Date(
                    new Date(visit.CheckInTime).getTime() + (330 * 60 * 1000)
                )
                : null
        }));

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {
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
                    new Date(visit.CheckInTime).getTime() + (330 * 60 * 1000)
                )
                : null,
            CheckOutTime: visit.CheckOutTime
                ? new Date(
                    new Date(visit.CheckOutTime).getTime() + (330 * 60 * 1000)
                )
                : null
        }));

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    checkInVisitor,
    checkOutVisitor,
    getActiveVisits,
    getVisitHistory
};