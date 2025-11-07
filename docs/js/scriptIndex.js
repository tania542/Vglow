// -------------------------
// Carrusel automático + manual
// -------------------------

const carousel = document.querySelector('.carousel-imagenes'); // Selecciona el contenedor que tiene todas las imágenes del carrusel
const images = document.querySelectorAll('.carousel-imagenes img'); // Selecciona todas las imágenes dentro del carrusel

// Índice actual de la imagen que se está mostrando
let currentIndex = 0;

// Función que muestra la imagen correspondiente al índice
function showSlide(index) {
  // Mueve el carrusel horizontalmente según el índice
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Evento para el botón de siguiente imagen
document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  // Incrementa el índice (con ciclo infinito)
  currentIndex = (currentIndex + 1) % images.length;
  // Muestra la nueva imagen
  showSlide(currentIndex);
});

// Evento para el botón de imagen anterior
document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  // Decrementa el índice (con ciclo infinito hacia atrás)
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  // Muestra la imagen anterior
  showSlide(currentIndex);
});

// Carrusel automático que cambia cada 5 segundos
setInterval(() => {
  // Incrementa el índice
  currentIndex = (currentIndex + 1) % images.length;
  // Muestra la nueva imagen
  showSlide(currentIndex);
}, 5000);


// -------------------------
// Botones de cantidad (+ y -)
// -------------------------

// Itera por cada producto para aplicar la funcionalidad de botones
document.querySelectorAll('.producto').forEach(producto => {
  // Selecciona el botón "-" (restar)
  const menosBtn = producto.querySelector('.cantidad button:first-child');
  // Selecciona el botón "+" (sumar)
  const masBtn = producto.querySelector('.cantidad button:nth-child(3)');
  // Selecciona el span que muestra el número actual
  const span = producto.querySelector('.cantidad span');

  // Evento para el botón "-"
  menosBtn.addEventListener('click', (e) => {
    // Previene el comportamiento por defecto (ej: envío de formulario)
    e.preventDefault();
    // Convierte el contenido del span a número
    let count = parseInt(span.textContent);
    // Solo resta si el valor es mayor a 1
    if (count > 1) span.textContent = count - 1;
  });

  // Evento para el botón "+"
  masBtn.addEventListener('click', (e) => {
    // Previene comportamiento por defecto
    e.preventDefault();
    // Convierte el contenido del span a número
    let count = parseInt(span.textContent);
    // Incrementa el número mostrado
    span.textContent = count + 1;
  });
});


// -------------------------
// Desplazamiento de categorías (horizontal)
// -------------------------

// Selecciona el contenedor que se desplazará
const contenedor = document.getElementById('contenedor');

// Selecciona el botón "siguiente" de categorías
const btnNext = document.querySelector('.cat-btn.next');

// Selecciona el botón "anterior" de categorías
const btnPrev = document.querySelector('.cat-btn.prev');

// Evento para desplazar el contenedor a la derecha
btnNext.addEventListener('click', () => {
  contenedor.scrollBy({ left: 200, behavior: 'smooth' }); // Desplaza 200px a la derecha con animación suave
});

// Evento para desplazar el contenedor a la izquierda
btnPrev.addEventListener('click', () => {
  contenedor.scrollBy({ left: -200, behavior: 'smooth' }); // Desplaza 200px a la izquierda con animación suave
});


// -------------------------
// Validación de campo de búsqueda
// -------------------------

// Agrega evento al formulario de búsqueda cuando se envía
document.querySelector('.buscar').addEventListener('submit', function (e) {
  // Selecciona el input del formulario de búsqueda
  const input = this.querySelector('input[name="search"]');
  // Si el campo está vacío (solo espacios)
  if (input.value.trim() === '') {
    // Previene que se envíe el formulario
    e.preventDefault();
    // Muestra alerta para que el usuario escriba algo
    alert('Por favor, escribe algo para buscar.');
  }
});


// -------------------------
// Mensaje al agregar al carrito
// -------------------------

// Selecciona todos los botones o íconos que agregan al carrito
document.querySelectorAll('.agregar-carrito').forEach(icono => {
  // Agrega evento al hacer clic
  icono.addEventListener('click', function (e) {
    // Previene comportamiento por defecto
    e.preventDefault();
    // Muestra mensaje indicando que el producto fue agregado al carrito
    alert('Producto agregado al carrito 🛒');
  });
});
