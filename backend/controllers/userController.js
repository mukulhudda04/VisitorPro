const sql = require("mssql");
const bcrypt = require("bcrypt");

// ===============================
// Get All Users
// ===============================
const getUsers = async (req, res) => {
    try {

        const result = await sql.query(`
            SELECT
    U.UserId,
    U.FullName,
    U.Email,
    U.Phone,

    U.RoleId,
    U.DepartmentId,

    R.RoleName,
    D.DepartmentName,

    U.IsActive,
    U.CreatedAt
            FROM Users U
            INNER JOIN Roles R
                ON U.RoleId = R.RoleId
            INNER JOIN Departments D
                ON U.DepartmentId = D.DepartmentId
            ORDER BY U.UserId DESC
        `);

        return res.status(200).json({
            success: true,
            count: result.recordset.length,
            data: result.recordset
        });

    } catch (error) {

        console.error("Get Users Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }
};

// ===============================
// Create User
// ===============================
const createUser = async (req, res) => {

    try {

        const {
            fullName,
            email,
            password,
            phone,
            roleId,
            departmentId
        } = req.body;

        if (
            !fullName ||
            !email ||
            !password ||
            !phone ||
            !roleId ||
            !departmentId
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const existingUser = await sql.query`
            SELECT UserId
            FROM Users
            WHERE Email = ${email}
        `;

        if (existingUser.recordset.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await sql.query`
            INSERT INTO Users
            (
                FullName,
                Email,
                PasswordHash,
                Phone,
                RoleId,
                DepartmentId,
                IsActive
            )
            VALUES
            (
                ${fullName},
                ${email},
                ${hashedPassword},
                ${phone},
                ${roleId},
                ${departmentId},
                1
            )
        `;

        return res.status(201).json({
            success: true,
            message: "User created successfully."
        });

    } catch (error) {

        console.error("Create User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }

};

// ===============================
// Update User
// ===============================
const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            fullName,
            email,
            phone,
            roleId,
            departmentId,
            isActive
        } = req.body;

        if (
            !fullName ||
            !email ||
            !phone ||
            !roleId ||
            !departmentId
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const existingUser = await sql.query`
            SELECT UserId
            FROM Users
            WHERE Email = ${email}
            AND UserId <> ${id}
        `;

        if (existingUser.recordset.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        await sql.query`
            UPDATE Users
            SET
                FullName = ${fullName},
                Email = ${email},
                Phone = ${phone},
                RoleId = ${roleId},
                DepartmentId = ${departmentId},
                IsActive = ${isActive}
            WHERE UserId = ${id}
        `;

        return res.status(200).json({
            success: true,
            message: "User updated successfully."
        });

    } catch (error) {

        console.error("Update User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }

};

// ===============================
// Delete User
// ===============================
const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        // Prevent deleting default Admin
if (Number(id) === 1) {
    return res.status(403).json({
        success: false,
        message: "Default Admin cannot be deleted."
    });
}

        await sql.query`
            DELETE FROM Users
            WHERE UserId = ${id}
        `;

        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {

        console.error("Delete User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });

    }

};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};