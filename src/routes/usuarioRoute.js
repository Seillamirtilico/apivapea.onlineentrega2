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


