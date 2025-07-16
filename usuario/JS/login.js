
document.querySelector('.formulario').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Obtén los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmar-contrasena').value;

    // Validación de campos obligatorios (opcional, porque el HTML ya los tiene "required")
    if (!nombre || !apellido || !telefono || !email || !contrasena || !confirmarContrasena) {
        alert('Por favor completa todos los campos');
        return;
    }

    // Valida que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Armamos el objeto solo con los campos que espera la API
    const user = {
        id_usuario: 0, // Si tu backend lo autogenera puedes usar 0 o null
        nombre: nombre,
        apellido: apellido,
        contrasena: contrasena,
        correo_electronico: email,
        numero_telefono: telefono,
        idRol: 2 // O el rol que corresponda a usuarios normales en tu sistema
    };

    try {
        // Cambia la URL por la de tu endpoint real
        const response = await fetch('http://localhost:8080/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert('¡Registro exitoso!');
            // Aquí puedes redirigir, limpiar formulario o mostrar mensaje bonito
            // window.location.href = 'login.html';
        } else {
            // Intentar leer el mensaje de error del backend si existe
            let error = '';
            try {
                const data = await response.json();
                error = data.message || JSON.stringify(data);
            } catch (_) {
                error = 'Error desconocido en el registro';
            }
            alert('Error al registrar: ' + error);
        }
    } catch (err) {
        alert('Error de conexión al registrar usuario');
        console.error(err);
    }
});
