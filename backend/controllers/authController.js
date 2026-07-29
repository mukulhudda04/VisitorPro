const sql = require("mssql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required."
            });
        }

        // Get User
        const result = await sql.query`
            SELECT UserId, FullName, Email, PasswordHash, RoleId, IsActive
            FROM Users
            WHERE Email = ${email}
        `;

        if (result.recordset.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password."
            });
        }

        const user = result.recordset[0];

        // Check Active Status
        if (!user.IsActive) {
            return res.status(403).json({
                success: false,
                message: "User account is inactive."
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.PasswordHash);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password."
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                userId: user.UserId,
                email: user.Email,
                roleId: user.RoleId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful.",
            token,
            user: {
                userId: user.UserId,
                fullName: user.FullName,
                email: user.Email,
                roleId: user.RoleId
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
};

module.exports = {
    login
};