//Agregar nuevos productos

class agregarProductos{
    constructor (nombre, imagen, precio, piezas){
        this.imagen = imagen
        this.nombre = nombre
        this.precio = precio
        this.piezas = piezas
    }
}


const productosDatos = [
    { nombre: 'Pantalla de serigrafía', precio: 230, piezas: 1},
    { nombre: 'Acondicionador', precio: 250, piezas: 1},
    { nombre: 'Racleta', precio: 150, piezas: 1},
    { nombre: 'Espatula', precio: 80, piezas: 1},
    { nombre: 'Bicromato', precio: 120, piezas: 1},
    { nombre: 'Aplicador de emulsión', precio: 400, piezas: 1},
    { nombre: 'Emulsión de serigrafía', precio: 340, piezas: 1},
    { nombre: 'Serisol', precio: 180, piezas: 1}
];




function crearContenedor(producto) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<h1>Nombre: ${producto.nombre}</h1> 
    <h2>Precio: ${producto.precio}</h2> 
    <p>Piezas: ${producto.piezas}</p>`;
    return contenedor;
}

const cardBody1 = document.querySelector(".info");
const cardBody2 = document.querySelector(".info2");
const cardBody3 = document.querySelector(".info3");
const cardBody4 = document.querySelector(".info4");
const cardBody5 = document.querySelector(".info5");
const cardBody6 = document.querySelector(".info6");
const cardBody7 = document.querySelector(".info7");
const cardBody8 = document.querySelector(".info8");


for (let i = 0; i < 1; i++) {
    const contenedor1 = crearContenedor(productosDatos[i]);
    cardBody1.appendChild(contenedor1);
}

for (let i = 1; i < 2; i++) {
    const contenedor2 = crearContenedor(productosDatos[i]);
   cardBody2.appendChild(contenedor2);
}

for (let i = 2; i < 3; i++) {
    const contenedor3 = crearContenedor(productosDatos[i]);
    cardBody3.appendChild(contenedor3);
}

for (let i = 3; i < 4; i++) {
    const contenedor4 = crearContenedor(productosDatos[i]);
    cardBody4.appendChild(contenedor4);
}

for (let i = 4; i < 5; i++) {
    const contenedor5 = crearContenedor(productosDatos[i]);
    cardBody5.appendChild(contenedor5);
}

for (let i = 5; i < 6; i++) {
    const contenedor6 = crearContenedor(productosDatos[i]);
    cardBody6.appendChild(contenedor6);
}

for (let i = 6; i < 7; i++) {
    const contenedor7 = crearContenedor(productosDatos[i]);
    cardBody7.appendChild(contenedor7);
}

for (let i = 7; i < 8; i++) {
    const contenedor8 = crearContenedor(productosDatos[i]);
    cardBody8.appendChild(contenedor8);
}

const productosJSON = JSON.stringify(productosDatos);

localStorage.setItem('productos', productosJSON);

