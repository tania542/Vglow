document.querySelector('.buscar').addEventListener('submit', function (e) {
    const input = this.querySelector('input[name="search"]');
    if (input.value.trim() === '') {
        e.preventDefault();
        alert('Por favor, escribe algo para buscar.');
    }
});

// Solo UN manejador submit para el formulario de contacto:
document.querySelector('.contact-form form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const phone = this.phone.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    // Validar nombre: solo letras y espacios
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

    // Validar email (podrías agregar regex o dejar que el tipo="email" valide)
    if (!email) {
        alert("Por favor, escribe un correo electrónico válido.");
        this.email.focus();
        return;
    }

    // Validar mensaje no vacío
    if (message.length === 0) {
        alert("Por favor, escribe un mensaje.");
        this.message.focus();
        return;
    }

    // Si pasa todas las validaciones, enviar datos por fetch
    try {
        const response = await fetch('http://localhost:3000/enviar-contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email, message })
        });

        const result = await response.json();

        alert(result.message);

        if (response.ok) {
            this.reset();  // Limpia formulario
        }
    } catch (error) {
        alert('Hubo un error al enviar el formulario.');
        console.error(error);
    }
});
