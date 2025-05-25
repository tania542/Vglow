document.querySelectorAll('.cantidad').forEach(cantidadDiv => {
  const minusBtn = cantidadDiv.querySelector('button:first-child');
  const plusBtn = cantidadDiv.querySelector('button:nth-of-type(2)');
  const span = cantidadDiv.querySelector('span');

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

// Mensaje al agregar al carrito
document.querySelectorAll('.carrito').forEach(icono => {
  icono.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Producto agregado al carrito 🛒');
  });
});

// Validación de campo de búsqueda
document.querySelector('.buscar')?.addEventListener('submit', function (e) {
  const input = this.querySelector('input[name="search"]');
  if (input.value.trim() === '') {
    e.preventDefault();
    alert('Por favor, escribe algo para buscar.');
  }
});
