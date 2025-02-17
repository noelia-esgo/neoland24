const jwt = require("jsonwebtoken");
const User = require("../models/users");


//codigo de autenticacion del usuario


const authenticate = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            return res.status(401).json({ message: "❌ No estás autorizado, falta el token" });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "❌ No estás autorizado" });
        }

        next();
    } catch (error) {
        console.error("❌ Error en autenticación:", error.message);
        return res.status(401).json({ message: "⚠ Token inválido o expirado" });
    }
};

module.exports = authenticate;



