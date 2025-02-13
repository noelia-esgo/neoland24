const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.js"); // ✅ Importa correctamente usando CommonJS

const router = express.Router();

router.post("/register", registerUser); // ✅ Define la ruta correctamente
router.post("/login", loginUser);

module.exports = router; // ✅ Exporta correctamente usando CommonJS














