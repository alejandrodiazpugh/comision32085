// ============================ MODULOS ===================================
const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs')
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');
const morgan = require('morgan');
const productos = require('./src/data/productos.json');



// ============================ INSTANCIA SERVER ==========================
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const routerProductos = require('./src/routes/productos.routes');
const routerFormulario = require('./src/routes/formulario.routes');
const { fstat } = require('fs');

// ============================ MIDDLEWARE ================================
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

// ===== BASE DE DATOS ============

const DB_MENSAJES = []
const DB_PRODUCTOS = productos; // PASO EXTRA, tal vez redundante, pero mi logica es no querer meter directamente al JSON el parseo


// ====== MOTOR DE PLANTILLAS =====
app.set('views', path.join(__dirname, 'src/views'));
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

// =========================== RUTAS ======================================
app.use('/', routerFormulario);

app.use('/api/productos', routerProductos);

app.get('*', (req, res) => {
    res.status(404).send('Error 404: Página no existe')
})


// ========================== SERVIDOR ====================================
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})

server.on('error', (err) => {
    console.log(`Error: ${err}`)
})


// ========================== WEBSOCKET ===================================
io.on('connection', (socket) => {
    socket.emit('from-server-messages', DB_MENSAJES);
    socket.emit('from-server-products', DB_PRODUCTOS);

    socket.on('from-client-message', mensaje => {
        DB_MENSAJES.push(mensaje);
        io.sockets.emit('from-server-messages', DB_MENSAJES)
    })

    socket.on('from-client-product', producto => {
        let id;
        if (DB_PRODUCTOS.length == 0) { // Revisa si ya existen DB_PRODUCTOS en el archivo
          id = 1;
        } else {
          id = DB_PRODUCTOS[DB_PRODUCTOS.length - 1].id + 1;
        }
        const productoConId = {id, ...producto}

        DB_PRODUCTOS.push(productoConId);
        fs.promises.writeFile('./src/data/productos.json', JSON.stringify(DB_PRODUCTOS));
        io.sockets.emit('from-server-products', DB_PRODUCTOS);
    })
})

