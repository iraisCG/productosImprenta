

function actualizarLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(data));
}

//función crear tarjetas
function tarjetaProducto(data){
    const cardContainer = document.getElementById('cards-container');

    data.forEach(item => {


        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        const imagen = document.createElement('img');
        imagen.src = item.imageP;

        const nombre = document.createElement('h2');
        nombre.textContent = item.nombreP;

        const precio = document.createElement('h3');
        precio.textContent = `Precio: $${item.precioP}`;

        const pieza = document.createElement('h4');
        pieza.textContent = `Piezas: ${item.piezasP}`;

        const venderButton = document.createElement('button');
        venderButton.textContent = 'Vender';
        venderButton.addEventListener('click', () => venderProducto(item, pieza, venderButton));

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(pieza);
        tarjeta.appendChild(venderButton);

        cardContainer.appendChild(tarjeta);
    });


}
//Función seleccionar los productos vendidos
function venderProducto(producto, piezaElement, buttonElement) {
    if (producto.piezasP > 0) {
        producto.piezasP--;
        piezaElement.textContent = `Piezas: ${producto.piezasP}`;
        actualizarLocalStorage();
        if (producto.piezasP === 0) {
            buttonElement.disabled = true;
        }
        mostrarProductosVendidos(producto);
    }
}

function actualizarLocalStorage() {
    const productosEnLocalStorage = JSON.parse(localStorage.getItem('productos'));
    localStorage.setItem('productos', JSON.stringify(productosEnLocalStorage));
}

//Mostrar los productos que se van seleccionando
function mostrarProductosVendidos(producto) {
    const productosVendidosContainer = document.getElementById('productos-vendidos');
    const productoVendidoDiv = document.createElement('div');
    productoVendidoDiv.textContent = `${producto.nombreP} - Precio: $${producto.precioP}`;
    productosVendidosContainer.appendChild(productoVendidoDiv);

    mostrarPrecioTotal();
}

//Sumar el precio de los productos seleccionados
function sumarPrecioProductosVendidos() {
    const productosVendidos = document.querySelectorAll('#productos-vendidos div');
    let precioTotal = 0;

    productosVendidos.forEach(producto => {
        const precioTexto = producto.textContent.split(' - Precio: $')[1];
        const precio = parseFloat(precioTexto);
        precioTotal += precio;
    });

    return precioTotal;
}

//Mostar el precio total de los productos seleccionados
function mostrarPrecioTotal() {
    const precioTotal = sumarPrecioProductosVendidos();
    const precioTotalContainer = document.getElementById('precio-total-vendidos');
    
    precioTotalContainer.innerHTML = '';

    const precioTotalDiv = document.createElement('div');
    precioTotalDiv.textContent = `Precio total de productos vendidos: $${precioTotal}`;
    
    // Crreación del botón terminar venta
    const terminarVentaButton = document.createElement('button');
    terminarVentaButton.textContent = 'Terminar Venta';
    terminarVentaButton.addEventListener('click', terminarVenta);

    precioTotalContainer.appendChild(precioTotalDiv);
    precioTotalContainer.appendChild(terminarVentaButton);
}

// Función terminar venta
function terminarVenta() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres terminar la venta?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, terminar venta',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            //  Confirmar venta 
            console.log('Venta terminada');
            Swal.fire('¡Venta terminada!', '', 'success');

            // Borrar suma y actualizar el precio total a cero
            const precioTotalContainer = document.getElementById('precio-total-vendidos');
            precioTotalContainer.innerHTML = '';


            const precioTotalDiv = document.createElement('div');
            precioTotalDiv.textContent = `Precio total de productos vendidos: $0`;

            precioTotalContainer.appendChild(precioTotalDiv);

            // Borrar productos seleccionados
            const productosVendidosContainer = document.getElementById('productos-vendidos');
            productosVendidosContainer.innerHTML = '';
        } else {
            // Cancelar venta
            console.log('Venta cancelada');
            Swal.fire('¡Venta cancelada!', '', 'error');


            // Recargar la página
            window.location.reload();
            
        }
    });
}



// Llamar el documento JSON con fetch
fetch("./listaProductos.json")
  .then(response => {
    // Verificar si la solicitud 
    if (!response.ok) {
      throw new Error("Hubo un problema al obtener el documento JSON")
    }
    else{
        
    return response.json()
    }
    
  })

  
  .then(data => {
    console.log(data.dataProductos)
    // crear las tarjetas de productos y mostrar el precio total
    tarjetaProducto(data.dataProductos);
    mostrarPrecioTotal();
  })
  .catch(error => {
    // error que ocurra durante el proceso
    console.error('Error:', error);
  });
















