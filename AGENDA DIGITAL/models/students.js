const mongoose = require("mongoose")



const studentSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, unique: true},
        sex: { type: String },
        age: { type: Number, require: true},
        
    },
    { timestamps: true }
)


const Student = mongoose.model('Student', studentSchema)

module.exports = Student