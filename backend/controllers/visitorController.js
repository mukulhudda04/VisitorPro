const sql = require("mssql");

const getVisitors = async (req, res) => {
    try {
        const result = await sql.query(`
            EXEC sp_GetVisitors
        `);

        res.status(200).json({
            success: true,
            count: result.recordset.length,
            data: result.recordset
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createVisitor = async (req, res) => {
    try {

        const {
            FullName,
            Phone,
            Email,
            CompanyName,
            IDProofType,
            IDProofNumber
        } = req.body;

        const PhotoPath = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        await sql.query`
            EXEC sp_CreateVisitor
                @FullName = ${FullName},
                @Phone = ${Phone},
                @Email = ${Email},
                @CompanyName = ${CompanyName},
                @IDProofType = ${IDProofType},
                @IDProofNumber = ${IDProofNumber},
                @PhotoPath = ${PhotoPath}
        `;

        res.status(201).json({
            success: true,
            message: "Visitor created successfully",
            photo: PhotoPath
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateVisitor = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            FullName,
            Phone,
            Email,
            CompanyName,
            IDProofType,
            IDProofNumber
        } = req.body;

        const PhotoPath = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        await sql.query`
            UPDATE Visitors
            SET
                FullName = ${FullName},
                Phone = ${Phone},
                Email = ${Email},
                CompanyName = ${CompanyName},
                IDProofType = ${IDProofType},
                IDProofNumber = ${IDProofNumber},
                PhotoPath = ${PhotoPath}
            WHERE VisitorId = ${id}
        `;

        res.status(200).json({
            success: true,
            message: "Visitor updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteVisitor = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await sql.query`
            DELETE FROM Visitors
            WHERE VisitorId = ${id}
        `;

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                success: false,
                message: "Visitor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Visitor deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getVisitors,
    createVisitor,
    updateVisitor,
    deleteVisitor
};