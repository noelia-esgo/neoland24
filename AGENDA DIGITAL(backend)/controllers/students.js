const Student = require('./models/students')

const createStudent = async (req, res) => {
    try {
        const { name, age } = req.body;

        // Verifica que ambos campos existen y que age es un número válido
        if (!name || age === "" || age === null || age === undefined) {
            return res.status(400).json({ message: "⚠ Todos los campos son obligatorios." });
        }

        const numericAge = Number(age);
        if (isNaN(numericAge) || numericAge < 0) {
            return res.status(400).json({ message: "⚠ La edad debe ser un número válido mayor o igual a 0." });
        }

        // Crea el nuevo estudiante con los datos validados
        const student = await Student.create({ name, age: numericAge });

        console.log("✅ Estudiante creado:", student);
        res.status(201).json({ message: "✅ Alumno registrado con éxito.", student });

    } catch (error) {
        console.error("❌ Error en la creación del estudiante:", error);
        res.status(500).json({ message: "Error interno del servidor al crear el estudiante." });
    }
};


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

const updateStudent = async (req, res) => {
    try {
        console.log("📌 Datos recibidos para actualizar:", req.body);

        // ✅ Permitir `0` como edad válida
        if (!req.body.name || req.body.age === "" || req.body.age === null || req.body.age === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        req.body.age = Number(req.body.age); // ✅ Convertir `age` a número

        if (isNaN(req.body.age) || req.body.age < 0) {
            return res.status(400).json({ message: "⚠ La edad debe ser un número mayor o igual a 0." });
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // ✅ Devuelve el estudiante actualizado
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


module.exports = { createStudent, getStudent,updateStudent,deleteStudent }