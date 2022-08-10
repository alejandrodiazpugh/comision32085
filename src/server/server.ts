import Contenedor from "../index"; // muchas dudas de la diferencia entre un require import y un import -- ts no me permitio dejarlo como const require
const express = require("express");

const app = express();

const productos = new Contenedor("../data/productos.json")
const PORT:number = 8080;

// ===================== Routing

    // Ruta inicial
    app.get('/', (req, res) => {
        res.send(`<h1 style='font-family: sans-serif'>Servidor Levantado en el puerto ${PORT}</h1>`);
    })

    // Ruta Productos
    app.get('/productos', async (req, res) => {
        await res.send(await productos.getAll())
    });
    
    // Ruta Producto Random
    app.get('/productoRandom', async (req, res) => {
        res.send(await productos.getById(Math.floor(Math.random() * ((await productos.getAll()).length)) + 1))
    })

    app.get('*', (req, res) => {
        res.send('Error 404 - Página no existe');
    })

    const server = app.listen(PORT, () => { // duda: solo estoy declarando server, por qué se inicializa por si sola?
        console.log(`Servidor levantado en http://localhost:${PORT}`)
    });