const express = require("express");
const router = express.Router();
const Student = require("../models/students");
const mongoose = require("mongoose");




// ✅ Obtener un estudiante por ID
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Estudiante no encontrado" });
        res.json(student);
    } catch (error) {
        console.error("❌ Error en la consulta:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
})

router.post("/", async (req, res) => {
    try {
        console.log("📩 Datos recibidos:", req.body);

        const { name, age } = req.body;
        if (!name || age === undefined) {
            return res.status(400).json({ message: "⚠ Todos los campos son obligatorios." });
        }

        const newStudent = new Student({ name, age });
        await newStudent.save();

        console.log("✅ Estudiante creado:", newStudent);
        res.status(201).json({ message: "✅ Alumno registrado con éxito.", student: newStudent });

    } catch (error) {
        console.error("❌ Error al crear el estudiante:", error);
        res.status(500).json({ message: "Error interno del servidor al crear el estudiante." });
    }
});

router.put("/:id", async (req, res) => {
    try {
        console.log("📌 Datos recibidos para actualizar:", req.body);

        if (!req.body.name || req.body.age === undefined) {
            return res.status(400).json({ message: "⚠ Todos los campos son obligatorios." });
        }

        // ✅ Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "❌ ID de estudiante inválido." });
        }

        // ✅ Buscar y actualizar el estudiante en MongoDB
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, age: Number(req.body.age) }, // 📌 Convertimos `age` en número
            { new: true, runValidators: true } // 📌 Devuelve el estudiante actualizado y valida los datos
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
router.delete("/:id", async (req, res) => {
    try {
        console.log("🗑 Eliminando estudiante con ID:", req.params.id);

        // ✅ Verificar si el ID es válido
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


