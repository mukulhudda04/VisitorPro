const requireAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        if (Number(req.user.roleId) !== 1) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin privileges required."
            });
        }

        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Admin authorization failed."
        });
    }
};

module.exports = requireAdmin;