const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  sleep: {
    morning: { hours: Number, minutes: Number },
    midday: { hours: Number, minutes: Number },
    evening: { hours: Number, minutes: Number },
  },
  food: {
    mealType: String,
    description: String,
    quantity: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Register", registerSchema);



