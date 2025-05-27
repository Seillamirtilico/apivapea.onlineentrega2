const express = require("express");
const router = express.Router();
const comentarioSchema = require("../models/comentarioModel");

// Crear un nuevo comentario
router.post("/", (req, res) => {
  const comentario = new comentarioSchema(req.body);
  comentario
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todos los comentarios
router.get("/", (req, res) => {
  comentarioSchema
    .find()
    .populate("usuarioId productoId")
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener comentarios por producto
router.get("/producto/:productoId", (req, res) => {
  const { productoId } = req.params;
  comentarioSchema
    .find({ productoId })
    .populate("usuarioId")
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar un comentario
router.put("/:id", (req, res) => {
  const { id } = req.params;
  comentarioSchema
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Comentario no encontrado" });
      res.json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar un comentario
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  comentarioSchema
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Comentario no encontrado" });
      res.json({ message: "Comentario eliminado exitosamente", data });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
