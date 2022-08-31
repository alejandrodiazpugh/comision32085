const express = require('express');
const routerProductos = express.Router();
const productos = require('../data/productos.json')

routerProductos.get('/', (req, res) => {
    res.status(200).send(productos);
})


routerProductos.get('/:num', (req, res) => {
    const num = parseInt(req.params.num);
    if(isNaN(num)) {
        return res.status(400).send('El parametro ingresado no es un número');
    };
    if(num < 1 || num > productos.length) {
        return res.status(400).send('El parametro está fuera de rango');
    }
    res.status(200).send(productos[num-1])
})

routerProductos.post('/', (req, res) => {
    const { id, titulo, precio, url} = req.body;
    productos.push(req.body);
    res.status(201).send({code: 201, msg: `Producto ${titulo} guardado con éxito`})
})


module.exports = routerProductos;