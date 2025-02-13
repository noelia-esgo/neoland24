const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json()); // 🔹 Necesario para recibir JSON
app.use(cors());

const studentsRoutes = require("./routes/students");
app.use("/api/students", studentsRoutes); // 🔹 Asegurar que esta línea existe

// 🔹 Conectar con MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar a MongoDB", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));






