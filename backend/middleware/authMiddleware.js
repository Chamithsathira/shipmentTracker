const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // ✅ Fix Bearer token format

    if (!token) {
        return res.status(403).json({ error: "Access denied" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }); // ✅ Ensure secret matches
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
};
