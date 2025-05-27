const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  comentario: {
    type: String,
    required: true,
  },
  calificacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  fecha: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Comentario", comentarioSchema);
