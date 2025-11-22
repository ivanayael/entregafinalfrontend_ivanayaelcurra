# Entrega Final del Proyecto - E-Commerce

## Curso de Desarrollo Web - Proyecto Integrador

### 🧩 Punto 1: Introducción al Proyecto Final

En esta etapa final, desarrollarás una página web completa que integre todo lo aprendido a lo largo del curso.

🔹 El proyecto consiste en un sitio web de e-commerce interactivo que:
● • Consume datos de una API REST.
● • Permite añadir productos a un carrito de compras.

🔧 Tecnologías y enfoques a aplicar:
● • HTML: estructura semántica.
● • CSS: diseño responsivo con Bootstrap y Flexbox.
● • JavaScript: renderizado dinámico, carrito, API.
● • Accesibilidad y SEO: buenas prácticas.

📋 Punto 2: Puntos Clave para Revisión y Entrega
● • Subida en GitHub Pages o Netlify.
● • Control de versiones con commits detallados.
● • Archivo README.md con descripción, tecnologías, instalación.

📦 Punto 3: Formato de Entrega
Repositorio en GitHub  
El repositorio debe ser público e incluir todos los archivos del proyecto.  
Hosting del Proyecto  
Subirlo a Netlify o GitHub Pages con un enlace funcional.  
Entrega en el Campus Virtual  
Subir los enlaces en la sección de Pre-Entrega de Proyecto.

🕒 Punto 4: Condiciones de Entrega
📆 A partir de la clase N°15 contás con 7 días corridos para entregar el proyecto.
● • HTML semántico (header, nav, main, etc.).
● • Formulario funcional con Formspree.
● • Archivo README.md con resumen del proyecto.

🎨 Punto 5: Estilos y Diseño Responsivo
● • CSS externo: estilos para header, footer y navegación.
● • Google Fonts correctamente aplicadas.
● • Uso de background (color, imagen o gradiente).
● • Productos: cards con Flexbox.
● • Reseñas: uso de Grid.
● • Contacto: Media Queries para responsividad.

🖼 Punto 6: Multimedia y Navegación
● • Imágenes, videos o iframe correctamente integrados.
● • Menú de navegación con lista desordenada e ítems internos.
● • Hosting obligatorio con enlace funcional.

⚙ Punto 7: Funcionalidad con JavaScript
● • Archivo script.js enlazado.
● • Validación de formularios (campos requeridos, email).
● • Manipulación del DOM para interacciones.
● • Fetch API para consumir productos desde una API REST.
● • Renderizado de productos en tarjetas con imagen, título y precio.

🛒 Punto 8: Carrito de Compras Dinámico
● • Agregar productos desde tarjetas.
● • Guardar carrito con localStorage o sessionStorage.
● • Contador dinámico de productos.
● • Lista de productos con cantidad, precio y total.
● • Posibilidad de editar o eliminar productos.

🔍 Punto 9: SEO y Accesibilidad
● • Etiquetas alt en imágenes.
● • Navegación accesible con teclado.
● • Uso de metaetiquetas en el head para mejorar el SEO.

✅ Punto 10: Funcionalidad Esperada
● • Página interactiva que permita ver productos, agregar al carrito, editarlo y simular la compra.
● • Formulario de contacto que funcione correctamente.
● • Diseño adaptable a distintos tamaños de pantalla.
● • Carrito persistente con localStorage/sessionStorage.

### 2. Descripción General

RWBY Shop es un e-commerce educativo que integra todos los contenidos del curso. El proyecto implementa un sitio funcional con productos obtenidos mediante una API REST, manejo completo de carrito, landing page animada, sistema básico de usuarios y una página de agradecimientos con contenido multimedia.

### 3. Características Principales

Consumo de API REST para obtener productos.
Renderizado dinámico mediante JavaScript.
Carrito con persistencia en localStorage.
Landing page con animación de partículas y música opcional.
Formulario de contacto funcional mediante Formspree.
Página de agradecimientos con video e imagen temática RWBY.
Login

### 4. Tecnologías Utilizadas

HTML5

CSS3 (Bootstrap, Flexbox, Grid)

JavaScript ES6+
Fetch API
LocalStorage / SessionStorage
Formspree
Git y GitHub
Netlify

### 5. Estructura del Proyecto

bash
Copiar código
/
├── index.html                # Página principal del e-commerce
├── landing.html              # Landing page animada
├── login.html                # Inicio de sesión
├── register.html             # Registro de usuarios
├── gracias.html              # Página de agradecimientos
├── styles.css                # Estilos globales
├── script.js                 # Lógica del e-commerce
├── /img                      # Recursos gráficos
└── README.md

### 6. Instalación y Uso

Clonar el repositorio:
No requiere servidor backend; funciona completamente en navegador.

Para loguearse al sistema, puede utilizar usuario admin y contraseña admin.

El sitio inicia su ingreso desde la landing page, en caso de ingresar desde index.html, re-digira a la lading page.

### 7. API de Productos

El proyecto utiliza una API REST para cargar productos mediante:

js
Copiar código
fetch("URL_DE_LA_API")
Los productos deben incluir:
id, title, price, image y description.

### 8. Carrito de Compras

- [x] Agregar productos desde tarjetas.

- [x] Modificar cantidad desde el carrito.

- [x] Eliminar productos.

- [x] Cálculo automático del total.

- [x] Persistencia mediante localStorage.

### 9. Accesibilidad y SEO

- [x] Estructura semántica (header, nav, main, footer).

- [x] Imágenes con atributos alt.

- [x] Navegación accesible con teclado.

- [x] Metaetiquetas estándar para motores de búsqueda.

- [x] Colores y contrastes adecuados.

### 10. Hosting del Proyecto

Disponible mediante:

- [x] GitHub Pages

- [x] Netlify

Ambos enlaces pueden subirse al Campus Virtual según la consigna.

### 11. Créditos y Agradecimientos

Talento Tech – Argentina -> Por la enseñanza y la dedicación

CLAMP :D  – Inspiración visual y temática.

RWBY (Rooster Teeth) – Inspiración visual y temática.

Video insertado con fines educativos.

Link oficial del e-commerce RWBY:

[https://shop.viz.com/pages/rwby](RWBY Site)

### 8. Mejoras a Futuro (relacionada a un ecommerce real)

- [] Registro de usuarios con validación.
- [] Hash de contraseñas con PBKDF2 + salt.
- [] Bloqueo de cuenta tras múltiples intentos fallidos.
- [] Sesión guardada en localStorage.
- [] Cierre de sesión disponible en el e-commerce.

### 13. Licencia

Proyecto académico para uso educativo.

Los recursos gráficos pertenecen a sus autores originales
