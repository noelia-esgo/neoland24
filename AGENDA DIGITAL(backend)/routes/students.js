const express = require("express");
const router = express.Router();
const Student = require("../models/students");

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "No encontrado" });
  res.json(student);
});

router.post("/", async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json({ student: newStudent });
});

router.put("/:id", async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStudent);
});

router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
});

module.exports = router;


