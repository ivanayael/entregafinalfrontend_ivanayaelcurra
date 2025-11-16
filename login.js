// Simulación de base de datos
const usuarios = [
  { usuario: "ivana", clave: "12345" },
  { usuario: "admin", clave: "admin" }
];

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
