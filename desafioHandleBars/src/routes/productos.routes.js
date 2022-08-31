const express = require('express');
const routerProductos = express.Router();
const fs = require('fs');
const productos = require('../data/productos.json')

const PATH = '../desafioHandleBars/src/data/productos.json'

routerProductos.get('/', (req, res) => {
    res.status(200).send(productos);
})


routerProductos.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)) {
        return res.status(400).send({err : 'No existe un producto con ese ID'});
    };
    if(id < 1 || id > productos.length) {
        return res.status(400).send({err: 'El producto no fue encontrado'});
    }
    res.status(200).send(productos[id-1])
})

routerProductos.post('/', (req, res) => {
    let id;
    if (productos.length == 0) { // Revisa si ya existen productos en el archivo
      id = 1;
    } else {
      id = productos[productos.length - 1].id + 1;
    }
    const { titulo, precio, url} = req.body;
    productos.push({id, ...req.body});
    fs.promises.writeFile(PATH, JSON.stringify(productos));
    return res.status(201).send({code: 201, msg: `Producto ${titulo} con ID ${id} guardado con éxito`})
})

routerProductos.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, precio, url } = req.body
    productos.forEach((producto) => {
        if(producto.id === id) {
            producto.titulo = titulo;
            producto.precio = precio;
            producto.url = url;
        }
    })
    fs.promises.writeFile(PATH, JSON.stringify(productos));
    return res.status(201).send({code: 201, msg: `Producto con ID ${id} actualizado a ${titulo}`})
})

routerProductos.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const matchedList = productos.filter(
      (producto) => producto.id === id
    );
    if (matchedList.length === 0) {
      return res.status(400).send(`No existe producto con ID ${id}.`);
    } else {
      const indexToDelete = productos.indexOf(matchedList[0]); // Encuentra el lugar en el arreglo original del producto a borrar
      productos.splice(indexToDelete);
      fs.promises.writeFile(PATH, JSON.stringify(productos)); // sobreescribe archivo original con nuevo arreglo
      return res.status(200).send({code: 200, msg: 'El elemento ha sido borrado'});
    }
})

module.exports = routerProductos;