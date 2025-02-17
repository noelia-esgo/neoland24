const express = require("express");
const {
  getRegistersByStudentId,
  getRegister,
  createRegister,
  updateRegister,
  deleteRegister
} = require("../controllers/registers");

const router = express.Router();

// Obtener todos los registros de un alumno
router.get("/student/:studentId", getRegistersByStudentId);

// Obtener un registro específico por ID
router.get("/record/:id", getRegister);

//  Crear un nuevo registro 
router.post("/student/:studentId", createRegister);


// Actualizar registro por ID
router.put("/record/:recordId", updateRegister);

// Eliminar registro por ID
router.delete("/record/:recordId", deleteRegister);


module.exports = router;








