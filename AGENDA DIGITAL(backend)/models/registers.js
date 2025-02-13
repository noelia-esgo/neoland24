const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  sleep: {
    morning: {
      hours: { type: Number, required: false, default: 0 },
      minutes: { type: Number, required: false, default: 0 },
    },
    midday: {
      hours: { type: Number, required: false, default: 0 },
      minutes: { type: Number, required: false, default: 0 },
    },
    evening: {
      hours: { type: Number, required: false, default: 0 },
      minutes: { type: Number, required: false, default: 0 },
    },
  },
  food: {
    mealType: { type: String, required: false },
    description: { type: String, required: false },
    quantity: { type: String, required: false },
  },
}, { timestamps: true });

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;


