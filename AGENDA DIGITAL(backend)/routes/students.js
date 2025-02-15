const express = require("express");
const router = express.Router();
const Student = require("../models/students");
const mongoose = require("mongoose");

// ✅ Crear un nuevo estudiante
router.post("/", async (req, res) => {
    try {
        console.log("📌 Creando nuevo estudiante con datos:", req.body);

        if (!req.body.name || req.body.age === undefined) {
            return res.status(400).json({ message: "⚠ Todos los campos son obligatorios." });
        }

        const newStudent = new Student({
            name: req.body.name.trim(), // Evitar espacios en blanco innecesarios
            age: Number(req.body.age),
            records: []  // Asegurar que tiene un array vacío para registros
        });

        const savedStudent = await newStudent.save();
        console.log("✅ Estudiante guardado:", savedStudent);

        res.status(201).json(savedStudent); // ✅ Enviar estudiante correctamente
    } catch (error) {
        console.error("❌ Error al crear el estudiante:", error);
        res.status(500).json({ message: "Error al crear el estudiante", error });
    }
});


// ✅ Obtener todos los estudiantes
router.get("/", async (req, res) => {
    try {
        const students = await Student.find({}, { records: 0 }); // 🔥 No traer registros en esta consulta
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener estudiantes", error });
    }
});

// ✅ Obtener un estudiante por ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "❌ ID de estudiante inválido." });
        }

        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "❌ Estudiante no encontrado" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el estudiante", error });
    }
});

// ✅ Actualizar un estudiante
router.put("/:id", async (req, res) => {
    try {
        console.log("📌 Datos recibidos para actualizar:", req.body);

        if (!req.body.name || req.body.age === undefined) {
            return res.status(400).json({ message: "⚠ Todos los campos son obligatorios." });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "❌ ID de estudiante inválido." });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, age: Number(req.body.age) },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "❌ Estudiante no encontrado" });
        }

        console.log("✅ Estudiante actualizado:", updatedStudent);
        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error("❌ Error al actualizar el estudiante:", error);
        res.status(500).json({ message: "⚠ Error interno del servidor." });
    }
});

// ✅ Eliminar un estudiante
router.delete("/:id", async (req, res) => {
    try {
        console.log("🗑 Eliminando estudiante con ID:", req.params.id);

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "❌ ID de estudiante inválido." });
        }

        const studentDelete = await Student.findByIdAndDelete(req.params.id);

        if (!studentDelete) {
            return res.status(404).json({ message: "❌ Estudiante no encontrado." });
        }

        console.log("✅ Estudiante eliminado:", studentDelete);
        res.json({ message: "✅ Estudiante eliminado con éxito" });

    } catch (error) {
        console.error("❌ Error al eliminar estudiante:", error);
        res.status(500).json({ message: "⚠ Error en el servidor al eliminar el estudiante." });
    }
});

module.exports = router;



