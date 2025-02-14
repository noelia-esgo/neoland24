const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const studentRoutes = require("./routes/students"); // ✅ Importamos la ruta de estudiantes
const registerRoutes = require("./routes/registers"); 

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Conectado a MongoDB"))
.catch(error => console.error("❌ Error en la conexión a MongoDB:", error));

// 📌 Rutas
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes); // ✅ Ahora las rutas de estudiantes funcionan
app.use("/api/registers", registerRoutes);
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));












