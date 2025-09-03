//Creamos una funcion IIFE(Inmediately Invoke Function Expression)
(function(){

    const form = document.getElementById('contactForm');
    const alerta = document.getElementById('alerta');

    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const subject = document.getElementById('subject')
    const message = document.getElementById('message')

    function setOk(el){
        el.classList.remove('is-invalid');
        el.classList.add('is-valid');        
    }

    function setError(el,msg){
        el.classList.remove('is-valid');
        el.classList.add('is-invalid');
        const fb = el.parentElement.querySelector('.invalid-feedback');
        if(fb && msg) fb.textContent = msg;
    }

    function validarNombre(){
        const v = name.value.trim();
        if(v.length < 3){setError(name, 'El nombre debe tener al menos 3 caracteres'); return false;}
        setOk(name); return true;
    }

    function validarCorreo(){
        const v = email.value.trim();
        const rx = /^[^\s@]+ @[^\s@]+\.[^\s@]$/;
        if(!rx.test(v)){setError(email,'Ingrese un correo valido (ej: nombre@tudominio.cl).'); return false;}
        setOk(email);return true;
    }

    function validarTipo(){
        const v = subject.value;
        if(!v){setError(subject,'Debes seleccionar una opcion.'); return false;}
        setOk(subject);return true;
    }

    function validarMensaje(){
        const v = message.value.trim();
        if(v.length < 10){setError(message,'El mensaje debe tener al menos 10 caracteres.'); return false};
        setOk(message);return true;
    }

    //Feedback en tiempo real
    name.addEventListener('input',validarNombre);
    email.addEventListener('input',validarCorreo);
    subject.addEventListener('change',validarTipo);
    message.addEventListener('input',validarMensaje);

    form.addEventListener('submit', function(e){
        e.preventDefault();
        alerta.innerHTML = '';

        const ok = 
        validarNombre()&
        validarCorreo()&
        validarTipo()&
        validarMensaje();

        if(ok){
            alerta.innerHTML = <div class='alert alert-success' role="alert">
                ¡Mensaje enviado con exito! Te contactaremos en breve.
            </div>
        }else{
            alerta.innerHTML = <div class='alert alert-danger' role='alert'>
                Hay algunos errores, revisa los campos en rojo.
            </div>
            const firstInvalid = form.querySelector('.is-invalid');
            if(firstInvalid) firstInvalid.focus();
        }
    });


})