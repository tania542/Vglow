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

//validacion de formulario de contacto
document.querySelector('.contact-form form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const phone = this.phone.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    // Validar nombre: solo letras y espacios, sin números ni caracteres especiales
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!nameRegex.test(name)) {
        alert("El nombre solo puede contener letras y espacios, sin números ni caracteres especiales.");
        this.name.focus();
        return;
    }

    // Validar teléfono: solo números, 10 dígitos exactos
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("El número de contacto debe contener exactamente 10 números y sin letras ni caracteres especiales.");
        this.phone.focus();
        return;
    }
    
    // Validar mensaje no vacío
    if (message.length === 0) {
        alert("Por favor, escribe un mensaje.");
        this.message.focus();
        return;
    }

    // Si pasa todas las validaciones, podés enviar el formulario o hacer lo que necesites
    alert("Formulario enviado correctamente. ¡Gracias por contactarnos!");
    this.submit(); // enviar el formulario normalmente
});