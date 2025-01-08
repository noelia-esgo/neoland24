const User = require('../models/users')



const updateUser = async (req, res) => {  //actualiza el usuario en la base de datos segun el id proporcionado 

    try {
        const user = await User.findByIdAndUpdate(req.params.id, { ...req.body })//buscar un usuario por su id y actualizarlo con los valores
        const userUpdated= await User.findById(user._id)
        if (!user) {
            return res.status(404).json({ errorMessage: 'User not found' })
        }
        res.json(user)

    } catch (error) {
        res.status(500)
    }
}

const deleteUser = async (req, res) => { //elimina un usuario basado en su ID
    try {
        const userDelete = await User.findByIdAndDelete(req.params.id)
        console.log("🚀 ~ deleteUser ~ userDelete:", userDelete)
        if (!userDelete) {
            return res.status(404).json({ errorMessage: 'User not found' })
        }
        res.json({ message: 'User deleted' })

    } catch (error) {
        console.log("🚀 ~ deleteUser ~ error:", error)
        res.status(500)

    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'Not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        console.log( error)
        res.status(500).json({ message: 'Get user error' })

    }

}

module.exports = { updateUser, deleteUser,getUser }