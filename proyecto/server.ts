// ==================== Modulos  ==============================

import Contenedor from './src/contenedor'
import express  from 'express';
import productosRouter from './src/routes/productos.routes';

const app = express();

const productos = new Contenedor("../data/productos.json")
const PORT = 8082;

// ==================== Middleware ============================

app.use(express.static('/public'));


// ===================== Routing ==============================

 



    app.get('*', (req, res) => {
        res.send('Error 404 - Página no existe');
    })


// ======================= Servidor ============================

    const server = app.listen(PORT, () => { // duda: solo estoy declarando server, por qué se inicializa por si sola?
        console.log(`Servidor levantado en http://localhost:${PORT}`)
    });