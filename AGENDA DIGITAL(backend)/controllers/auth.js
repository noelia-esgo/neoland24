const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// generar un token JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

//  registro de usuario
const registerUser = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        //  Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "❌ El usuario ya existe" });
        }

        //  Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(String(password), 10);


        // Crear nuevo usuario
        const newUser = await User.create({ email, name, password: hashedPassword });

        //  Generar token y enviar respuesta
        res.status(201).json({
            message: "✅ Registro exitoso",
            user: { _id: newUser._id, name: newUser.name, email: newUser.email },
            token: generateToken(newUser),
        });

    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ message: "⚠ Error en el servidor" });
    }
};

// inicio de sesion
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        //  Buscar usuario en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "❌ Credenciales incorrectas" });
        }

        //  Comparar contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(String(password), user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "❌ Credenciales incorrectas" });
        }

        //  Generar token y enviar respuesta
        res.json({
            message: "✅ Login exitoso",
            user: { _id: user._id, name: user.name, email: user.email },
            token: generateToken(user),
        });

    } catch (error) {
        console.error("❌ Error en el login:", error);
        res.status(500).json({ message: "⚠ Error en el servidor" });
    }
};

module.exports = { registerUser, loginUser };









