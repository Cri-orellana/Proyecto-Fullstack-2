(function() {

    const form = document.getElementById('contactForm');
    const alerta = document.getElementById('alerta');

    const nombre = document.getElementById('name');
    const correo = document.getElementById('email');
    const seleccion = document.getElementById('subject');
    const mensaje = document.getElementById('message');

    function setOk(el) {
        const feedbackEl = el.parentElement.querySelector('.invalid-feedback');
        if (feedbackEl) {
            feedbackEl.textContent = ''; 
        }
        el.classList.remove('is-invalid');
        el.classList.add('is-valid');
    }

    function setError(el, msg) {
        el.classList.remove('is-valid');
        el.classList.add('is-invalid');
        const fb = el.parentElement.querySelector('.invalid-feedback');
        if (fb && msg) {
            fb.textContent = msg;
        }
    }

    function validarNombre() {
        const v = nombre.value.trim();
        if (v.length < 3) {
            setError(nombre, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        }
        setOk(nombre);
        return true;
    }

    function validarCorreo() {
        const v = correo.value.trim();
        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!rx.test(v)) {
            setError(correo, 'Ingrese un correo válido (ej: nombre@dominio.cl).');
            return false;
        }
        setOk(correo);
        return true;
    }

    function validarTipo() {
        const v = seleccion.value;
        if (!v) {
            setError(seleccion, 'Debes seleccionar una opción.');
            return false;
        }
        setOk(seleccion);
        return true;
    }

    function validarMensaje() {
        const v = mensaje.value.trim();
        if (v.length < 10) {
            setError(mensaje, 'El mensaje debe tener al menos 10 caracteres.');
            return false;
        }
        setOk(mensaje);
        return true;
    }

    nombre.addEventListener('input', validarNombre);
    correo.addEventListener('input', validarCorreo);
    seleccion.addEventListener('change', validarTipo);
    mensaje.addEventListener('input', validarMensaje);

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        alerta.innerHTML = ''; 

        const esNombreValido = validarNombre();
        const esCorreoValido = validarCorreo();
        const esTipoValido = validarTipo();
        const esMensajeValido = validarMensaje();

        if (esNombreValido && esCorreoValido && esTipoValido && esMensajeValido) {
            alerta.innerHTML = `<div class='alert alert-success' role="alert">
                ¡Mensaje enviado con éxito! Te contactaremos en breve.
            </div>`;
            form.reset(); 
            document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        } else {
            alerta.innerHTML = `<div class='alert alert-danger' role='alert'>
                Hay algunos errores, por favor revisa los campos en rojo.
            </div>`;
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });

})(); 