const Student = require('../models/students')

const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body)
        res.status(200).json(student)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Create student error' })
    }
}


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

const updateStudent= async(req,res)=>{
    console.log(req.body)
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, { ...req.body },{
            new: true
        })
        
        console.log(student)
    //buscar un usuario por su id y actualizarlo con los valores
        if (!student) {
            return res.status(404).json({ errorMessage: 'Student not found' })
        }
        res.json(student)

    

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

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