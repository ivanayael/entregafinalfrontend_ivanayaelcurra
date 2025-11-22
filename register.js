// Cargar usuarios existentes
let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios_db")) || [];

// Formulario
const formRegistro = document.getElementById("register-form");

// Evento submit
formRegistro.addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar recarga

  const nuevoUser = document.getElementById("nuevo_usuario").value.trim(); // Obtener nuevo usuario
  const nuevaClave = document.getElementById("nueva_clave").value.trim(); // Obtener nueva clave

  // Validar campos
  if (!nuevoUser || !nuevaClave) {
    alert("Todos los campos son obligatorios. Completelos antes de continuar"); // Mostrar error
    return;
  }

  // Verificar usuario existente
  const existe = usuariosGuardados.find(u => u.usuario === nuevoUser); // Buscar usuario

  // Si existe, mostrar error
  if (existe) {
    alert("El usuario ya existe. Por favor, elija otro nombre de usuario."); // Mostrar error
    return; 
  }

  // Guardar usuario
  usuariosGuardados.push({ usuario: nuevoUser, clave: nuevaClave }); // Agregar a la lista
  localStorage.setItem("usuarios_db", JSON.stringify(usuariosGuardados)); // Guardar en localStorage

  // Confirmación
  alert("Registro exitoso. Ahora puede iniciar sesión con su usuario y contraseña.");
  window.location.href = "login.html"; // Redirigir a login.html
});
