// Cargar usuarios existentes desde localStorage
let usuariosGuardados = [];

try {
  usuariosGuardados = JSON.parse(localStorage.getItem("usuarios_db")) || [];
} catch {
  usuariosGuardados = [];
}

// Formulario de registro
const formRegistro = document.getElementById("register-form");

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoUser = document.getElementById("nuevo_usuario").value.trim();
  const nuevaClave = document.getElementById("nueva_clave").value.trim();

  // Validación básica
  if (!nuevoUser || !nuevaClave) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (nuevoUser.length < 3) {
    alert("El usuario debe contener al menos 3 caracteres.");
    return;
  }

  if (nuevaClave.length < 4) {
    alert("La contraseña debe contener al menos 4 caracteres.");
    return;
  }

  // Verificar si el usuario ya existe
  const existe = usuariosGuardados.some(
    (u) => u.usuario.toLowerCase() === nuevoUser.toLowerCase()
  );

  if (existe) {
    alert("El usuario ya existe. Seleccione otro nombre.");
    return;
  }

  // Guardar nuevo usuario
  usuariosGuardados.push({
    usuario: nuevoUser,
    clave: nuevaClave
  });

  localStorage.setItem("usuarios_db", JSON.stringify(usuariosGuardados));

  alert("Registro exitoso. Ahora puede iniciar sesión.");
  window.location.href = "./login.html";
});
