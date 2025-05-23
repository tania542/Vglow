// -------------------------
// Carrusel automático + manual
// -------------------------
const carousel = document.querySelector('.carousel-imagenes');
const images = document.querySelectorAll('.carousel-imagenes img');
let currentIndex = 0;

function showSlide(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showSlide(currentIndex);
});

document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showSlide(currentIndex);
});

// Carrusel automático cada 5 segundos
setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  showSlide(currentIndex);
}, 5000);


// -------------------------
// Botones de cantidad (+ y -)
// -------------------------
document.querySelectorAll('.producto').forEach(producto => {
  const minusBtn = producto.querySelector('.cantidad button:first-child');
  const plusBtn = producto.querySelector('.cantidad button:nth-child(3)');
  const span = producto.querySelector('.cantidad span');

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let count = parseInt(span.textContent);
    if (count > 1) span.textContent = count - 1;
  });

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let count = parseInt(span.textContent);
    span.textContent = count + 1;
  });
});


// -------------------------
// Desplazamiento de categorías (horizontal)
// -------------------------
  const contenedor = document.getElementById('contenedor');
  const btnNext = document.querySelector('.cat-btn.next');
  const btnPrev = document.querySelector('.cat-btn.prev');

  btnNext.addEventListener('click', () => {
    contenedor.scrollBy({ left: 200, behavior: 'smooth' });
  });

  btnPrev.addEventListener('click', () => {
    contenedor.scrollBy({ left: -200, behavior: 'smooth' });
  });

// -------------------------
// Validación de campo de búsqueda
// -------------------------
document.querySelector('.buscar').addEventListener('submit', function (e) {
  const input = this.querySelector('input[name="search"]');
  if (input.value.trim() === '') {
    e.preventDefault();
    alert('Por favor, escribe algo para buscar.');
  }
});


// -------------------------
// Mensaje al agregar al carrito
// -------------------------

document.querySelectorAll('.agregar-carrito').forEach(icono => {
  icono.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Producto agregado al carrito 🛒');
  });
});

