

const data = [
    { imageP: './medios/pantalla_serigrafia.jpg', nombreP: 'Pantalla de serigrafía', precioP: 230, piezasP: 15},
    { imageP: './medios/acondicionador_serigrafia.jpg', nombreP: 'Acondicionador', precioP: 250, piezasP: 50},
    { imageP: './medios/racleta_serigrafia.jpg', nombreP: 'Racleta', precioP: 150, piezasP: 100},
    { imageP: './medios/espatuta_serigrafia.jpg', nombreP: 'Espatula', precioP: 80, piezasP: 150},
    { imageP: './medios/bicromato.webp', nombreP: 'Bicromato', precioP: 120, piezasP: 120},
    { imageP: './medios/aplicador.webp', nombreP: 'Aplicador de emulsión', precioP: 400, piezasP: 51},
    { imageP: './medios/emulsion_serigrafia.jpg', nombreP: 'Emulsión de serigrafía', precioP: 340, piezasP: 81},
    { imageP: './medios/serisol.webp', nombreP: 'Serisol', precioP: 180, piezasP: 10}
];

localStorage.setItem('productos', JSON.stringify(data));

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

    
    precioTotalContainer.appendChild(precioTotalDiv);
}


tarjetaProducto(data);
mostrarPrecioTotal();













