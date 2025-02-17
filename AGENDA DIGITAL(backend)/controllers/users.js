const User = require("../models/users");

// Obtener usuarios por ID
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "❌ Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("❌ Error al obtener usuario:", error);
        res.status(500).json({ message: "⚠ Error en el servidor" });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "❌ Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        console.error("❌ Error al actualizar usuario:", error);
        res.status(500).json({ message: "⚠ Error en el servidor" });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "❌ Usuario no encontrado" });
        }
        res.json({ message: "✅ Usuario eliminado correctamente" });
    } catch (error) {
        console.error("❌ Error al eliminar usuario:", error);
        res.status(500).json({ message: "⚠ Error en el servidor" });
    }
};


//exportaciones
module.exports = { getUser, updateUser, deleteUser };