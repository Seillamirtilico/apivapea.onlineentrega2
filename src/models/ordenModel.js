const mongoose = require("mongoose");

const ordenSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1,
      }
    }
  ],
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  estado: {
    type: String,
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
    default: "pendiente",
  },
  fecha: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Orden", ordenSchema);
