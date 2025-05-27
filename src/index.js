const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();

const productoRoutes = require("./routes/productoRoutes");
const usuarioRoutes = require("./routes/usuarioRoute");
const ordenRoutes = require("./routes/ordenRoute");         // ✅ NUEVA RUTA
const comentarioRoutes = require("./routes/comentarioRoute"); // ✅ NUEVA RUTA

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ REGISTRO DE LAS RUTAS
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ordenes", ordenRoutes);           // ✅ REGISTRO DE RUTA DE ÓRDENES
app.use("/api/comentarios", comentarioRoutes);  // ✅ REGISTRO DE RUTA DE COMENTARIOS

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
