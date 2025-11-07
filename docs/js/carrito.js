function actualizarTotal() {
  const productos = document.querySelectorAll('.producto');
  let total = 0;

  productos.forEach(producto => {
    const precio = parseInt(producto.querySelector('.precio').textContent);
    const cantidad = parseInt(producto.querySelector('.cantidad').value);
    total += precio * cantidad;
  });

  document.getElementById('total').textContent = `Total: $${total.toLocaleString()}`;
}

function eliminarProducto(event) {
  const producto = event.target.closest('.producto');
  producto.remove();
  actualizarTotal();
}

document.querySelectorAll('.cantidad').forEach(input => {
  input.addEventListener('change', actualizarTotal);
});

document.querySelectorAll('.eliminar').forEach(btn => {
  btn.addEventListener('click', eliminarProducto);
});

document.querySelector('.pagar').addEventListener('click', () => {
  alert('Gracias por tu compra. Serás redirigido a la página de pago.');
});

// Inicializa el total al cargar
actualizarTotal();
