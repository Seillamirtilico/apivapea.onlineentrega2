const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();

const productoRoutes = require("./routes/productoRoutes");
const usuarioRoutes = require("./routes/usuarioRoute"); // ✅ IMPORTACIÓN DE LAS RUTAS DE USUARIO

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ REGISTRO DE LAS RUTAS ANTES DEL MANEJADOR DE ERRORES
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes); // ✅ AQUÍ VA ESTA LÍNEA

// ❌ ESTA RUTA CATCH-ALL VA AL FINAL
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// ✅ CONEXIÓN A MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conexión exitosa a MongoDB"))
  .catch((error) => console.log("❌ Error en la conexión:", error));

// ✅ INICIAR SERVIDOR
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
