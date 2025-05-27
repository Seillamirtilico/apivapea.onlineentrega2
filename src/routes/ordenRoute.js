const express = require("express");
const router = express.Router();
const ordenSchema = require("../models/ordenModel");

// Crear una nueva orden
router.post("/", (req, res) => {
  const orden = new ordenSchema(req.body);
  orden
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todas las órdenes
router.get("/", (req, res) => {
  ordenSchema
    .find()
    .populate("usuarioId productos.productoId")
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener una orden por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  ordenSchema
    .findById(id)
    .populate("usuarioId productos.productoId")
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Orden no encontrada" });
      res.json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar una orden por ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  ordenSchema
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Orden no encontrada" });
      res.json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar una orden por ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ordenSchema
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Orden no encontrada" });
      res.json({ message: "Orden eliminada exitosamente", data });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
