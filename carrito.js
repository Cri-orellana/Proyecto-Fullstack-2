document.addEventListener('DOMContentLoaded', () => {

    const contenedorProductos = document.getElementById('product-container'); 
    const cuerpoModalCarrito = document.getElementById('cart-modal-body');
    const contadorCarrito = document.getElementById('cart-count');
    const totalCarrito = document.getElementById('cart-total');
    const botonVaciarCarrito = document.getElementById('clear-cart-btn');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function dibujarCarrito() {
        cuerpoModalCarrito.innerHTML = '';

        if (carrito.length === 0) {
            const textoVacio = document.createElement('p');
            textoVacio.textContent = 'Tu carrito de compras está vacío.';
            cuerpoModalCarrito.appendChild(textoVacio);
            return;
        }

        carrito.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');
            
            divProducto.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${producto.image}" alt="${producto.name}" style="width: 60px;" class="me-3">
                    <div>
                        <h6 class="mb-0">${producto.name}</h6>
                        <small class="text-muted">$${producto.price.toLocaleString('es-CL')}</small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <span class="mx-2">Cantidad: ${producto.quantity}</span>
                    <button class="btn btn-danger btn-sm btn-eliminar-producto" data-id="${producto.id}">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            `;
            cuerpoModalCarrito.appendChild(divProducto);
        });

        actualizarTotales();
        guardarCarritoEnLocalStorage();
    }

    function agregarAlCarrito(evento) {
        const boton = evento.target;
        
        const producto = {
            id: boton.dataset.id,
            name: boton.dataset.name,
            price: parseFloat(boton.dataset.price),
            image: boton.dataset.image,
            quantity: 1
        };

        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.quantity++;
        } else {
            carrito.push(producto);
        }
        
        alert(`"${producto.name}" fue agregado al carrito.`);

        dibujarCarrito();
    }
    
    function eliminarDelCarrito(evento) {
        if (evento.target.closest('.btn-eliminar-producto')) {
            const botonEliminar = evento.target.closest('.btn-eliminar-producto');
            const idProducto = botonEliminar.dataset.id;

            carrito = carrito.filter(producto => producto.id !== idProducto);

            dibujarCarrito();
        }
    }

    function actualizarTotales() {
        const cantidadTotal = carrito.reduce((suma, producto) => suma + producto.quantity, 0);
        const precioTotal = carrito.reduce((suma, producto) => suma + (producto.price * producto.quantity), 0);
        
        contadorCarrito.textContent = cantidadTotal;
        totalCarrito.textContent = `$${precioTotal.toLocaleString('es-CL')}`;
        /*error en el contador de items del carrito, no se reinicia al apretrar vaciar*/ 
        /*if (carrito.length === 0) {
            contadorCarrito.textContent = '0';
        }*/
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    dibujarCarrito();
    totalCarrito.textContent = '$0';
    contadorCarrito.textContent = '0';
    localStorage.removeItem('carrito'); 
}

    const botonesAgregar = document.querySelectorAll('.add-to-cart-btn');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    cuerpoModalCarrito.addEventListener('click', eliminarDelCarrito);
    
    botonVaciarCarrito.addEventListener('click', vaciarCarrito);

    dibujarCarrito();
});