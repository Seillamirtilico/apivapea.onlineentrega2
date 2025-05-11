const express = require("express");
const router = express.Router();
const productoSchema = require("../models/productoModel");

// Crear un nuevo producto
router.post("/", (req, res) => {
  const producto = new productoSchema(req.body);
  producto
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todos los productos
router.get("/", (req, res) => {
  productoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener un producto por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  productoSchema
    .findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Producto no encontrado" });
      res.json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar un producto por ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  productoSchema
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Producto no encontrado" });
      res.json(data);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar un producto por ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  productoSchema
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) return res.status(404).json({ message: "Producto no encontrado" });
      res.json({ message: "Producto eliminado exitosamente", data });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;