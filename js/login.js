// Redirección si ya hay sesión activa
if (localStorage.getItem("usuario_logueado")) {
  window.location.href = "index.html";
}

// Usuarios base del sistema
const usuariosBase = Object.freeze([
  { usuario: "ivana", clave: "12345" },
  { usuario: "admin", clave: "admin" }
]);

// Cargar usuarios creados en registro
let usuariosExtra = [];

try {
  usuariosExtra = JSON.parse(localStorage.getItem("usuarios_db")) || [];
} catch {
  usuariosExtra = [];
}

// Unificar listas
const usuarios = [...usuariosBase, ...usuariosExtra];

// Formulario
const form = document.getElementById("login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("usuario").value.trim().toLowerCase();
  const pass = document.getElementById("clave").value.trim();

  if (!user || !pass) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const encontrado = usuarios.find(
    (u) => u.usuario.toLowerCase() === user && u.clave === pass
  );

  if (encontrado) {
    localStorage.setItem("usuario_logueado", encontrado.usuario);
    window.location.href = "index.html";
  } else {
    alert("El usuario o la contraseña son incorrectos.");
  }
});
