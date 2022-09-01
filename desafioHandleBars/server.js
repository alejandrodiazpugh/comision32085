// ============================ MODULOS ===================================
const express = require('express');
const exphbs = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');
const morgan = require('morgan');



// ============================ INSTANCIA SERVER ==========================
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const routerProductos = require('./src/routes/productos.routes');
const routerFormulario = require('./src/routes/formulario.routes');

// ============================ MIDDLEWARE ================================
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

// ===== BASE DE DATOS ============

const DB_MENSAJES = []

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
const server = app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})

server.on('error', (err) => {
    console.log(`Error: ${err}`)
})


// ========================== WEBSOCKET ===================================
io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
    socket.emit('from-server-messages', {DB_MENSAJES});

    socket.on('from-client-message', mensaje => {
        DB_MENSAJES.push(mensaje);
        io.sockets.emit('from-server-messages', {DB_MENSAJES})
    })
})

