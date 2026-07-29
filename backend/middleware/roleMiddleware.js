const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized."
            });
        }

        if (!allowedRoles.includes(req.user.roleId)) {
            return res.status(403).json({
                success: false,
                message: "Access Forbidden. You do not have permission."
            });
        }

        next();
    };
};

module.exports = authorizeRoles;