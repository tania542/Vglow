// Función para validar que un correo electrónico tenga un formato válido
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
  return regex.test(email); // Retorna true si el email es válido
}

// Función para validar que una contraseña sea segura
function validarContrasena(password) {
  // La contraseña debe tener: mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password); // Retorna true si la contraseña cumple con los requisitos
}

// Función que permite alternar la visibilidad del campo de contraseña (mostrar/ocultar)
function togglePasswordFunc(toggleElement, inputElement) {
  toggleElement.addEventListener('click', () => {
    // Si actualmente está en modo "oculto", cambiar a visible
    if (inputElement.type === 'password') {
      inputElement.type = 'text';
      toggleElement.textContent = '🙉'; // Cambia el icono
    } else {
      // Si está visible, cambiar a modo "oculto"
      inputElement.type = 'password';
      toggleElement.textContent = '🙈';
    }
  });
}

/////////////////////////
// LÓGICA DE LOGIN
/////////////////////////

const formLogin = document.getElementById('form-login'); // Busca el formulario de login

// Solo ejecuta esto si el formulario existe en la página
if (formLogin) {
  const inputCorreo = document.getElementById('correo'); // Campo correo
  const inputContrasena = document.getElementById('contrasena'); // Campo contraseña
  const togglePassword = formLogin.querySelector('.toggle-password'); // Icono del ojo

  togglePasswordFunc(togglePassword, inputContrasena); // Activa función para mostrar/ocultar contraseña

  // Evento al enviar el formulario
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recargar la página

    const correo = inputCorreo.value.trim();
    const contrasena = inputContrasena.value.trim();

    // Verifica que los campos no estén vacíos
    if (!correo || !contrasena) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Validación simulada de login (esto debería consultarse con una base de datos real)
    if (correo === 'admin@vglow.com' && contrasena === '1234') {
      alert('Inicio de sesión exitoso ✅');
      window.location.href = 'index.html'; // Redirige a la página principal
    } else {
      alert('Correo o contraseña incorrectos ❌');
    }
  });
}

/////////////////////////
// LÓGICA DE REGISTRO
/////////////////////////

const formRegister = document.getElementById('form-register'); // Busca el formulario de registro

// Solo ejecuta esto si el formulario de registro existe
if (formRegister) {
  const inputUsuario = document.getElementById('Usuario'); // Campo nombre de usuario
  const inputCorreo = formRegister.querySelector('#correo'); // Campo correo
  const inputContrasena = formRegister.querySelector('#contrasena'); // Campo contraseña

  // Elementos para mostrar mensajes de error
  const errorUsuario = document.getElementById('error-usuario');
  const errorCorreo = document.getElementById('error-correo');
  const errorContrasena = document.getElementById('error-contrasena');

  const togglePassword = formRegister.querySelector('.toggle-password'); // Icono del ojo

  togglePasswordFunc(togglePassword, inputContrasena); // Activa mostrar/ocultar contraseña

  // Evento al enviar el formulario de registro
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recargar la página

    // Limpia errores anteriores
    errorUsuario.textContent = '';
    errorCorreo.textContent = '';
    errorContrasena.textContent = '';

    let hayError = false; // Bandera para verificar errores

    // Validar que el nombre de usuario no esté vacío
    if (inputUsuario.value.trim() === '') {
      errorUsuario.textContent = 'Por favor ingresa un nombre de usuario.';
      hayError = true;
    }

    // Validar el formato del correo
    if (!validarEmail(inputCorreo.value.trim())) {
      errorCorreo.textContent = 'Por favor ingresa un correo válido.';
      hayError = true;
    }

    // Validar que la contraseña sea segura
    if (!validarContrasena(inputContrasena.value.trim())) {
      errorContrasena.textContent =
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
      hayError = true;
    }

    // Si no hay errores, mostrar alerta de éxito (simulado)
    if (!hayError) {
      alert('Registro exitoso 🎉');
    }
  });
}

// Verificamos que el formulario exista en la página
const formRecuperar = document.getElementById('form-recuperar');

if (formRecuperar) {
  const inputCorreo = document.getElementById('correo-recuperar');
  const errorSpan = document.getElementById('error-correo-recuperar');
  const exitoSpan = document.getElementById('exito-recuperar');

  formRecuperar.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos el envío del formulario

    const correo = inputCorreo.value.trim();

    // Limpiamos mensajes anteriores
    limpiarMensajes();

    // Validaciones
    if (!correo) {
      mostrarMensaje(errorSpan, 'Por favor ingresa tu correo electrónico.', 'error');
      return;
    }

    if (!validarEmail(correo)) {
      mostrarMensaje(errorSpan, 'Por favor ingresa un correo válido.', 'error');
      return;
    }

    // Simula envío de recuperación y muestra mensaje de éxito
    mostrarMensaje(exitoSpan, `Se ha enviado un enlace de recuperación a: ${correo} 📧`, 'exito');
    formRecuperar.reset(); // Limpiamos campos del formulario
  });

  // Función para mostrar mensaje (error o éxito)
  function mostrarMensaje(span, mensaje, tipo) {
    span.textContent = mensaje;
    span.style.color = tipo === 'error' ? 'red' : 'green';
    span.style.display = 'block';

    // Ocultar después de 5 segundos
    setTimeout(() => {
      span.textContent = '';
      span.style.display = 'none';
    }, 5000);
  }

  // Limpia ambos mensajes (error y éxito)
  function limpiarMensajes() {
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
    exitoSpan.textContent = '';
    exitoSpan.style.display = 'none';
  }

  // Valida si el correo es válido con expresión regular
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
