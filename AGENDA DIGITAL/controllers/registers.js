const Register = require('../models/registers')

const createRegister = async (req, res) => {
    try {
        const register = await Register.create(req.body)
        res.status(200).json(register)
    } catch (error) {
        console.log( error)
        res.status(500).json({ message: 'Create register error' })
    }
}


const getRegister = async (req, res) => {
    try {
        const register = await Register.findById(req.params.id)
        if (!register) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.status(200).json(product)
    } catch (error) {
        console.log( error)
        res.status(500).json({ message: 'Get register error' })

    }

}

const updateRegister= async(req,res)=>{
    try {
        const register = await Register.findByIdAndUpdate(req.params.id ,{ ...req.body})//buscar un usuario por su id y actualizarlo con los valores, 
        
        if (!register) {
            return res.status(404).json({ errorMessage: 'Register not found' })
        }
        res.json(register)

    } catch (error) {
        res.status(500)
    }
}

const deleteRegister= async(req,res)=>{
    try {
        const registerDelete = await Register.findByIdAndDelete(req.params.id)
        console.log(registerDelete)
        if (!registerDelete) {
            return res.status(404).json({ errorMessage: 'Register not found' })
        }
    
        res.json({ message: 'Register deleted' })

    } catch (error) {
        console.log(error)
        res.status(500)

    }

}


module.exports = { createRegister, getRegister,updateRegister,deleteRegister }
