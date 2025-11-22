const API_URL = "https://fakestoreapi.com/products"; // URL de la API

// Variable global para productos
let allProducts = [];

// Elementos del DOM
const productsList = document.getElementById("productos-list"); // Contenedor de productos
const cartCount = document.getElementById("cart-count"); // Contador del carrito
const cartItemsContainer = document.getElementById("cart-items"); // Contenedor de items del carrito
const cartTotal = document.getElementById("cart-total"); // Total del carrito
const checkoutBtn = document.getElementById("checkout"); // Botón de checkout

const searchInput = document.getElementById("search-input"); // Input de búsqueda
const categoryFilter = document.getElementById("category-filter"); // Select de categorías

// Carrito almacenado en localStorage

let cart = JSON.parse(localStorage.getItem("cart_v1")) || {}; 

// Carrito
function saveCart() {
  localStorage.setItem("cart_v1", JSON.stringify(cart)); // Guardar en localStorage
  updateCartUI(); // Actualizar UI
}

function updateCartUI() {
  const totalCount = Object.values(cart).reduce((s, i) => s + i.quantity, 0); // Sumar cantidades
  cartCount.textContent = totalCount; // Actualizar contador
  renderCartItems(); // Renderizar items
}

// Renderizar items del carrito
function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  for (const id in cart) {

    // Obtener item
    const item = cart[id];

    // Calcular total
    total += item.price * item.quantity;

    // Crear fila
    const row = document.createElement("div");

    // Clases CSS
    row.className = "d-flex justify-content-between align-items-center border-bottom py-2";

    // Contenido de la fila
    row.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <div>$${item.price.toFixed(2)}</div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <input type="number" class="form-control form-control-sm qty-input"
          min="1" value="${item.quantity}" data-id="${id}">

        <button class="btn btn-danger btn-sm remove-btn" data-id="${id}">X</button>
      </div>
    `; // Contenido de la fila
    cartItemsContainer.appendChild(row);
  }

  // Actualizar total
  cartTotal.textContent = `$${total.toFixed(2)}`;
  attachCartListeners();
}

function attachCartListeners() { // Eventos del carrito
  document.querySelectorAll(".remove-btn").forEach(btn => { // Botones eliminar
    btn.onclick = () => { // Al hacer clic en eliminar
      delete cart[btn.dataset.id]; // Eliminar del carrito
      saveCart(); // Guardar cambios
    };
  });

  document.querySelectorAll(".qty-input").forEach(input => { // Cantidad
    input.onchange = () => {
      const id = input.dataset.id; // Obtener ID
      cart[id].quantity = parseInt(input.value) || 1; // Validar cantidad
      saveCart(); // Guardar cambios
    };
  });
}

function addToCart(product) { // Agregar al carrito
  if (cart[product.id]) { 
    cart[product.id].quantity += 1; // Incrementar cantidad
  } else {
    cart[product.id] = { ...product, quantity: 1 }; // Clonar objeto y agregar cantidad
  }
  saveCart(); // Guardar cambios
}

// Renderizado
function renderProducts(products) {
  productsList.innerHTML = ""; // Limpiar contenedor
  products.forEach(p => {
    const card = document.createElement("div"); // Crear tarjeta
    card.className = "card h-100 shadow-sm fade-in"; // Clases CSS
    card.tabIndex = 0;
    
    // Contenido de la tarjeta
    
    card.innerHTML = `
      <img src="${p.image}" class="card-img-top img-fade" alt="${p.title}">
      <div class="card-body d-flex flex-column">
        <h6 class="card-title">${p.title}</h6>
        <div class="text-warning mb-2">★★★☆☆</div>
        <p class="card-text fw-bold mb-3">$${p.price.toFixed(2)}</p>
        <button class="btn btn-primary mt-auto add-btn" data-id="${p.id}">
          Agregar al carrito
        </button>
      </div>
    `;
    productsList.appendChild(card); // Agregar tarjeta al contenedor
  });

  document.querySelectorAll(".add-btn").forEach(btn => { // Botones "Agregar al carrito"
    btn.onclick = () => { // Al hacer clic en "Agregar al carrito"
      const prod = allProducts.find(p => p.id == btn.dataset.id); // Buscar producto
      addToCart(prod); // Agregar al carrito
    };
  });
}

// Filtros
function applyFilters() {
  const search = searchInput.value.toLowerCase(); // texto de búsqueda
  const category = categoryFilter.value; // categoría seleccionada

  // Filtrar por búsqueda
  let filtered = allProducts.filter(p => 
    p.title.toLowerCase().includes(search) // Buscar por título
  );


  // Filtrar por categoría
  if (category !== "all") { // Todas las categorías
    filtered = filtered.filter(p => p.category === category);
  }
  // Renderizar productos filtrados
  renderProducts(filtered);
}
// Búsqueda
searchInput.addEventListener("input", applyFilters);
// Cambio de categoría
categoryFilter.addEventListener("change", applyFilters);

// Categorías
async function loadCategories() {
  // Obtener categorías desde API
  const res = await fetch(`${API_URL}/categories`);
  // Llenar el select
  const categories = await res.json();

  // Otras categorías
  categories.forEach(cat => { 
    // Crear opción
    const opt = document.createElement("option");
    // Asignar valores
    opt.value = cat;
    // Texto en mayúsculas
    opt.textContent = cat.toUpperCase();
    // Agregar al select
    categoryFilter.appendChild(opt);
  });
}

// Productos
async function fetchProducts() {
  // Obtener productos desde API
  const res = await fetch(API_URL);
  // Guardar en variable global
  allProducts = await res.json();
  // Renderizar productos
  renderProducts(allProducts);
}

// Checkout
checkoutBtn.onclick = () => {
   // Simulación de compra
  alert("Compra simulada. ¡Gracias por su compra! 😊");
  // Vaciar carrito
  cart = {};
  // Guardar cambios
  saveCart();
};

// Tema Seasons
const themeSelector = document.getElementById("theme-selector");

// Tema guardado
const currentTheme = localStorage.getItem("seasons_theme") || "spring";

// Aplicar tema guardado
document.body.classList.add(`theme-${currentTheme}`);
themeSelector.value = currentTheme;

// Cambio de tema
themeSelector.onchange = () => {
  document.body.className = "";
  document.body.classList.add(`theme-${themeSelector.value}`);
  localStorage.setItem("seasons_theme", themeSelector.value);
};

// Inicialización
updateCartUI();
loadCategories();
fetchProducts();

// Efecto fade-in para imágenes
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".img-fade").forEach(img => {
    img.classList.add("loaded");
  });
});

// Logout
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem("usuario_logueado");
    window.location.href = "login.html";
  };
}