const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },

  records: [  
    {
      sleep: {
        morning: { hours: Number, minutes: Number },
        midday: { hours: Number, minutes: Number },
        evening: { hours: Number, minutes: Number }
      },
      food: {
        mealType: { type: String },
        description: { type: String },
        quantity: { type: String }
      }
    }
  ]
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
