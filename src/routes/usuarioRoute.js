const express = require("express");
const router = express.Router();
const usuarioSchema = require("../models/usuarioModel");

// Crear un nuevo usuario
router.post("/usuarios", async (req, res) => {
  try {
    const nuevoUsuario = new usuarioSchema(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los usuarios
router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await usuarioSchema.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un usuario por ID
router.get("/usuarios/:id", async (req, res) => {
  try {
    const usuario = await usuarioSchema.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un usuario por ID
router.put("/usuarios/:id", async (req, res) => {
  try {
    const usuarioActualizado = await usuarioSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!usuarioActualizado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un usuario por ID
router.delete("/usuarios/:id", async (req, res) => {
  try {
    const usuarioEliminado = await usuarioSchema.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado exitosamente", data: usuarioEliminado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router