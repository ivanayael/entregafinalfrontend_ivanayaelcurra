// Gestión básica del tema visual
// Este script carga el tema almacenado en localStorage cuando inicia la página


document.addEventListener("DOMContentLoaded", function () {
const tema = localStorage.getItem("season-theme");


if (tema && typeof tema === "string") {
document.body.className = tema;
}
});