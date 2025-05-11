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

