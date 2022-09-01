const express = require('express');
const routerFormulario = express.Router();
const productos = require('../data/productos.json');
const fs = require('fs');

const PATH = '../desafioHandleBars/src/data/productos.json'

routerFormulario.get('/', (req, res) => {
    res.render('index', {productos});
})

routerFormulario.post('/', (req,res) => {
    let id;
    if (productos.length == 0) { // Revisa si ya existen productos en el archivo
      id = 1;
    } else {
      id = productos[productos.length - 1].id + 1;
    }
    const { titulo, precio, url} = req.body;
    productos.push({id, ...req.body});
    fs.promises.writeFile(PATH, JSON.stringify(productos));
    res.redirect('/');
})

module.exports = routerFormulario;