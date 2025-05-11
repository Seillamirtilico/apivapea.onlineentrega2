const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Correo no válido']
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 6
  },
  tipoUsuario: {
    type: String,
    enum: ["cliente", "admin"],
    default: "cliente"
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash de contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para verificar contraseña
usuarioSchema.methods.compararContraseña = async function (contraseñaIngresada) {
  return await bcrypt.compare(contraseñaIngresada, this.contraseña);
};

module.exports = mongoose.model("Usuario", usuarioSchema);