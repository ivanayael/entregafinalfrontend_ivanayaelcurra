// Usuarios base + usuarios registrados
const usuariosBase = [
  { usuario: "ivana", clave: "12345" },
  { usuario: "admin", clave: "admin" }
];

// Cargar usuarios registrados en localStorage
let usuariosExtra = JSON.parse(localStorage.getItem("usuarios_db")) || [];

// Unir ambas listas
const usuarios = [...usuariosBase, ...usuariosExtra];

const form = document.getElementById("login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("clave").value.trim();

  const encontrado = usuarios.find(u => u.usuario === user && u.clave === pass);

  if (encontrado) {
    localStorage.setItem("usuario_logueado", user);
    window.location.href = "index.html";
  } else {
    alert("Credenciales incorrectas.");
  }
});
