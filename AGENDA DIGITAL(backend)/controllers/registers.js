const Register = require("../models/registers");
const Student = require("../models/students");
const mongoose = require("mongoose");

//  Obtener todos los registros de un alumno
const getRegistersByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    //  Validar si `studentId` es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "❌ ID de estudiante inválido." });
    }

    //  Buscar registros
    const records = await Register.find({ studentId: new mongoose.Types.ObjectId(studentId) });

    if (!records.length) {
      return res.status(200).json([]); // No hay registros
    }

    res.json(records);
  } catch (error) {
    console.error("❌ Error en getRegistersByStudentId:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

// Obtener un registro específico por ID
const getRegister = async (req, res) => {
  try {
    const record = await Register.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "❌ Registro no encontrado." });
    }
    res.json(record);
  } catch (error) {
    console.error("❌ Error al obtener el registro:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

// Crear un nuevo registro
const createRegister = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { sleep, food } = req.body;

    console.log("📩 Datos recibidos en el backend:", req.body);

    // Verificar si el estudiante existe
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "❌ Estudiante no encontrado" });
    }

    // Crear el nuevo registro en la colección `Register`
    const newRegister = new Register({
      studentId,
      sleep,
      food
    });

    await newRegister.save();

    // Agregar el nuevo registro al `records` del estudiante
    student.records.push(newRegister);
    await student.save();

    res.status(201).json({ message: "✅ Registro guardado correctamente", register: newRegister });

  } catch (error) {
    console.error("❌ Error al guardar el registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un registro por ID
const updateRegister = async (req, res) => {
  try {
    const { recordId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recordId)) {
      return res.status(400).json({ message: "❌ ID no válido." });
    }

    const updatedRegister = await Register.findByIdAndUpdate(
      recordId, 
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!updatedRegister) {
      return res.status(404).json({ message: "❌ Registro no encontrado." });
    }

    res.status(200).json({ message: "✅ Registro actualizado correctamente.", register: updatedRegister });
  } catch (error) {
    console.error("❌ Error al actualizar el registro:", error);
    res.status(500).json({ message: "Error interno en el servidor." });
  }
};


// Eliminar un registro por ID
const deleteRegister = async (req, res) => {
  try {
    const { recordId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recordId)) {
      return res.status(400).json({ message: "❌ ID no válido." });
    }

    const deletedRegister = await Register.findByIdAndDelete(recordId);

    if (!deletedRegister) {
      return res.status(404).json({ message: "❌ Registro no encontrado." });
    }

    res.json({ message: "✅ Registro eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el registro:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};
// Exportar todas las funciones
module.exports = {
  getRegistersByStudentId,
  getRegister,
  createRegister,
  updateRegister,
  deleteRegister,
};


