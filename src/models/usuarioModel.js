const mongoose = require("mongoose");

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

// Eliminar el hash de la contraseña en pre-save ya que no queremos encriptarla
usuarioSchema.pre("save", async function (next) {
  // No es necesario realizar nada con la contraseña antes de guardar
  next();
});

// Ya no necesitamos el método para comparar la contraseña
usuarioSchema.methods.compararContraseña = function (contraseñaIngresada) {
  // Simplemente comparamos la contraseña directamente (aunque no es seguro hacerlo)
  return this.contraseña === contraseñaIngresada;
};

module.exports = mongoose.model("Usuario", usuarioSchema);
