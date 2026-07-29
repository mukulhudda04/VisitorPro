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

        // Validation
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

        // Check Duplicate Email
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

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert User
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

module.exports = {
    getUsers,
    createUser
};