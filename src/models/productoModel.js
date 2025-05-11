const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  tipoFragancia: {
    type: String,
    enum: ["Lavanda", "Eucalipto", "Cítrico", "Menta", "Vainilla", "Sin fragancia"],
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  imagen: {
    type: String,
    required: true,
  },
  recargable: {
    type: Boolean,
    default: false,
  },
  duracionBateriaHoras: {
    type: Number,
    min: 0,
  },
  disponible: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Producto", productoSchema);
