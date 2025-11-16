// Cargar usuarios existentes
let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios_db")) || [];

// Formulario
const formRegistro = document.getElementById("register-form");

formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoUser = document.getElementById("nuevo_usuario").value.trim();
  const nuevaClave = document.getElementById("nueva_clave").value.trim();

  if (!nuevoUser || !nuevaClave) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  // Verificar usuario existente
  const existe = usuariosGuardados.find(u => u.usuario === nuevoUser);

  if (existe) {
    alert("El usuario ya existe.");
    return;
  }

  // Guardar usuario
  usuariosGuardados.push({ usuario: nuevoUser, clave: nuevaClave });
  localStorage.setItem("usuarios_db", JSON.stringify(usuariosGuardados));

  alert("Registro exitoso. Ahora puede iniciar sesión.");
  window.location.href = "login.html";
});
