import express from 'express';

const routerProductos = express.Router();

routerProductos.get('/', (req, res) => {
    res.status(200).send('Hola Mundo');
})


export default routerProductos;