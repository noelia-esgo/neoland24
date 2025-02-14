const express = require("express");
const {
  getRegistersByStudentId,
  getRegister,
  createRegister,
  updateRegister,
  deleteRegister
} = require("../controllers/registers");

const router = express.Router();

// 🔹 Obtener todos los registros de un estudiante
router.get("/student/:studentId", getRegistersByStudentId);

// 🔹 Obtener un registro específico por ID
router.get("/record/:id", getRegister);

// ✅ Crear un nuevo registro
router.post("/student/:studentId", createRegister);

// 🔹 Actualizar un registro por ID
router.put("/:id", updateRegister);

// 🔹 Eliminar un registro por ID
router.delete("/:id", deleteRegister);

module.exports = router;






