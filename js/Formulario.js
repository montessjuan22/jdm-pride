function iniciarFormulario() {
    console.log("Formulario.js cargado correctamente.");

    const formulario = document.getElementById('formulario-contacto');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            // Capturar los valores de los inputs
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const asunto = document.getElementById('asunto').value || 'Consulta General';

            // Eliminar mensaje previo si existe
            const mensajePrevio = document.getElementById('mensaje-exito');
            if (mensajePrevio) mensajePrevio.remove();

            // Crear tarjeta/banner de mensaje de exito
            const contenedorMensaje = document.createElement('div');
            contenedorMensaje.id = 'mensaje-exito';
            contenedorMensaje.className = 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm transition-all duration-300 mb-4 text-center';

            contenedorMensaje.innerHTML = `
                <p class="font-bold text-base text-emerald-500 mb-1">¡Gracias, ${nombre}!</p>
                <p class="text-zinc-300">Hemos recibido tu interes por el vehiculo <span class="font-semibold text-white">"${asunto}"</span>.</p>
                <p class="text-xs text-zinc-400 mt-1">Te contactaremos a <span class="text-emerald-400 font-medium">${correo}</span> muy pronto.</p>
            `;

            // Insertar el mensaje antes del botón o al inicio del formulario
            formulario.prepend(contenedorMensaje);

            // También lanzamos la alerta del sistema por si acaso
            alert(`¡Gracias ${nombre}! Hemos recibido tu interes por el vehiculo "${asunto}". Te responderemos a ${correo} muy pronto.`);

            // Limpiar los campos del formulario
            formulario.reset();
        });
    } else {
        console.error("No se encontró el elemento con ID 'formulario-contacto'");
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarFormulario);
} else {
    iniciarFormulario();
}