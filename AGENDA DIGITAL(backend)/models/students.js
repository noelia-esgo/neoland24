const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },

  // 🔹 Registro de comida
  foodRecords: [
    {
      date: { type: Date, default: Date.now },
      quantity: { type: String, enum: ["todo", "poco", "bastante", "nada"], required: true },
      type: { type: String, enum: ["desayuno", "comida", "merienda"], required: true },
      menu: { type: String, required: true },
    }
  ],

  // 🔹 Registro de sueño
  sleepRecords: {
    morning: { hours: Number, minutes: Number },
    midday: { hours: Number, minutes: Number },
    afternoon: { hours: Number, minutes: Number }
  }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;