import express from 'express';
const routerViews = express.Router();
import fs from 'fs';
const productos = require('../data/productos.json');
const carrito = require('../data/carrito.json')

routerViews.get('/', (req, res) => {
    res.status(200).render('index', {});
})

routerViews.get('/productos', (req,res) => {
    res.status(200).render('productos', {productos})
})

routerViews.get('/carrito', (req, res) => {
    res.status(200).render('carrito', {carrito})
})


export default routerViews;


