const Register = require("../models/registers"); // ✅ Asegurar que coincida con el nombre real del archivo

// 🔹 Obtener todos los registros de un estudiante por `studentId`
const mongoose = require("mongoose");

const getRegistersByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    // ✅ Validar si `studentId` es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "❌ ID de estudiante inválido." });
    }

    // ✅ Convertir `studentId` a `ObjectId` antes de la consulta
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



// 🔹 Obtener un registro específico por ID
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

// 🔹 Crear un nuevo registro
const createRegister = async (req, res) => {
  try {
    const { studentId, food, sleep } = req.body;

    // ✅ Validar que studentId es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "❌ ID de estudiante inválido." });
    }

    const newRegister = new Register({
      studentId: new mongoose.Types.ObjectId(studentId),
      food,
      sleep
    });

    await newRegister.save();
    res.status(201).json({ message: "✅ Registro creado con éxito.", register: newRegister });

  } catch (error) {
    console.error("❌ Error al crear el registro:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

  
// 🔹 Actualizar un registro por ID
const updateRegister = async (req, res) => {
  try {
    const updatedRegister = await Register.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRegister) {
      return res.status(404).json({ message: "❌ Registro no encontrado." });
    }

    res.json({ message: "✅ Registro actualizado correctamente", register: updatedRegister });
  } catch (error) {
    console.error("❌ Error al actualizar el registro:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

// 🔹 Eliminar un registro por ID
const deleteRegister = async (req, res) => {
  try {
    const deletedRegister = await Register.findByIdAndDelete(req.params.id);
    if (!deletedRegister) {
      return res.status(404).json({ message: "❌ Registro no encontrado." });
    }

    res.json({ message: "✅ Registro eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el registro:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

// 🔹 Exportamos todas las funciones
module.exports = {
  getRegistersByStudentId,
  getRegister,
  createRegister,
  updateRegister,
  deleteRegister,
};
