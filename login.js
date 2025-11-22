// Usuarios base + usuarios registrados
const usuariosBase = [
  { usuario: "ivana", clave: "12345" },
  { usuario: "admin", clave: "admin" }
];

// Cargar usuarios registrados en localStorage
let usuariosExtra = JSON.parse(localStorage.getItem("usuarios_db")) || [];

// Unir ambas listas
const usuarios = [...usuariosBase, ...usuariosExtra];

// Formulario de login
const form = document.getElementById("login-form");

// Evento submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar recarga

  const user = document.getElementById("usuario").value.trim(); // Obtener usuario
  const pass = document.getElementById("clave").value.trim(); // Obtener clave

  // Verificar credenciales
  // Buscar usuario
  const encontrado = usuarios.find(u => u.usuario === user && u.clave === pass);

  if (encontrado) { // Credenciales correctas
    localStorage.setItem("usuario_logueado", user); // Guardar en localStorage
    window.location.href = "index.html"; // Redirigir a index.html
  } else {
    alert("El usuario y contraseña es incorrecto. Por favor, vuelve a intentarlo."); // Mostrar error
  }
});
