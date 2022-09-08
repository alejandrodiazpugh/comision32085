// ============================ MODULOS ===================================
import express from 'express';
import path from 'path';
import morgan from 'morgan'
const exphbs = require ('express-handlebars');
const productos = require('./data/productos.json');

// ============================ INSTANCIA SERVER ==========================
const app = express();

import apiRouter from './routes/api.routes';
import viewsRouter from './routes/views.routes';

// ============================ MIDDLEWARE ================================
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../public')));


// ====== MOTOR DE PLANTILLAS =====
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

// =========================== RUTAS ======================================


app.use('/api', apiRouter);

app.use('/', viewsRouter);

app.get('*', (req, res) => {
    res.status(404).render('404')
})


// ========================== SERVIDOR ====================================
const PORT: number = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})

server.on('error', (err) => {
    console.log(`Error: ${err}`)
})
