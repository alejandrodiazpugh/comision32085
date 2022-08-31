// ============================ MODULOS ===================================
const express = require('express');
const morgan = require('morgan');

// ============================ INSTANCIA SERVER ==========================
const app = express();
const routerProductos = require('./src/routes/productos.routes');

// ============================ MIDDLEWARE ================================
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// =========================== RUTAS ======================================
app.use('/api/productos', routerProductos);

app.get('*', (req, res) => {
    res.status(404).send('Error 404: Página no existe')
})


// ========================== SERVIDOR ====================================
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})

server.on('error', (err) => {
    console.log(`Error: ${err}`)
})