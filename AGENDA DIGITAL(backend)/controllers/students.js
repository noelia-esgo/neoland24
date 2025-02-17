const Student = require('./models/students')

//nuevo alumno
const createStudent = async (req, res) => {
    try {
    req.body.name = req.body.name.trim(); 
    req.body.name = req.body.name.toLowerCase(); 

    const existingStudent = await Student.findOne({ name: req.body.name });
    if (existingStudent) {
        return res.status(400).json({ message: "❌ Ese nombre ya existe. Intenta con otro nombre." });
    }

    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
    } catch (error) {
    console.error("❌ Error al crear el estudiante:", error);

    res.status(500).json({ message: "Error interno del servidor" });
    }
};



//listado alumnos 

const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if (!student) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.status(200).json(student)
    } catch (error) {
        console.log( error)
        res.status(500).json({ message: 'Get student error' })

    }

}


//editar alumnos
const updateStudent = async (req, res) => {
    try {
        console.log(" Datos recibidos para actualizar:", req.body);

        
        if (!req.body.name || req.body.age === "" || req.body.age === null || req.body.age === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        req.body.age = Number(req.body.age); 

        if (isNaN(req.body.age) || req.body.age < 0) {
            return res.status(400).json({ message: "⚠ La edad debe ser un número mayor o igual a 0." });
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );

        if (!student) {
            return res.status(404).json({ message: '❌ Estudiante no encontrado' });
        }

        console.log("✅ Estudiante actualizado:", student);
        res.status(200).json({ message: "✅ Estudiante actualizado correctamente", student });

    } catch (error) {
        console.error("❌ Error al actualizar el estudiante:", error);
        res.status(500).json({ message: "Error interno del servidor al actualizar el estudiante" });
    }
};


//borrar alumnos
const deleteStudent= async(req,res)=>{
    try {
        const studentDelete = await Student.findByIdAndDelete(req.params.id)
        console.log(studentDelete)
        if (!studentDelete) {
            return res.status(404).json({ errorMessage: 'Student not found' })
        }
    
        res.json({ message: 'Student deleted' })

    } catch (error) {
        console.log(error)
        res.status(500)

    }

}


//exportaciones

module.exports = { createStudent, getStudent,updateStudent,deleteStudent }