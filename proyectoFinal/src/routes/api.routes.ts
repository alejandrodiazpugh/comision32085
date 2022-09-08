// ------------------- IMPORTAR MODULOS -------------------

import express from 'express';
import Contenedor from '../helpers/Contenedor';
import { adminVerification } from '../helpers/admin';
import { carrito } from '../helpers/Contenedor';
import { product } from '../helpers/Contenedor';

const productosApi = new Contenedor('../src/data/productos.json');
const carritoApi = new Contenedor('../src/data/carrito.json');

const apiRouter = express.Router();

// ------------------- VERIFICACION ADMIN -----------------

const isAdmin = adminVerification.isAdmin;
function adminAuth(req, res, next) {
	!isAdmin
		? res
				.status(403)
				.json({
					code: 403,
					msj: `Forbidden: ${req.method} ${req.baseUrl}${req.url}`,
				})
		: next();
}

// ------------------- RUTAS PRODUCTOS --------------------

apiRouter.get('/productos', async (req, res) => {
	res.status(200).json(await productosApi.getAll());
});

apiRouter.get('/productos/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		return res
			.status(400)
			.send({ err: 'No existe un producto con ese ID' });
	}
	res.status(200).send(await productosApi.getById(id));
});

apiRouter.post('/productos', adminAuth, (req, res) => {
	productosApi.save(req.body);
	return res.status(201).send({ code: 201, msg: `Producto ${req.body.nombre} creado` });
});

apiRouter.put('/productos/:id', adminAuth, async (req, res) => {
	const id = parseInt(req.params.id);
	await productosApi.update(id, req.body);
	return res
		.status(201)
		.send({ code: 201, msg: `Producto ${req.body.nombre} con ID ${id} actualizado` });
});

apiRouter.delete('/productos/:id', adminAuth, async (req, res) => {
	const id = parseInt(req.params.id);
	await productosApi.deleteById(id);

	return res
		.status(200)
		.send({ code: 200, msg: 'El elemento ha sido borrado' });
});

// ------------------- RUTAS CARRITO --------------------

apiRouter.post('/carrito', (req,res) => {
    carritoApi.save({ productos: [] });
    return res.status(201).send({code: 201, msg: 'Carrito creado'})
})

apiRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await carritoApi.deleteById(id);
    return res.status(200).send({code: 200, msg: `Carrido ${id} borrado con éxito`})
})

apiRouter.get('/carrito/:id/productos', async (req, res) => {
    const id = parseInt(req.params.id);
    const carrito: carrito = await carritoApi.getById(id);
    return res.status(200).send(carrito.productos);
})

apiRouter.post('/carrito/:id/productos', async (req, res) => {
    const carritoId = parseInt(req.params.id);
    const productId = parseInt(req.body.id);
    const carrito = await carritoApi.getById(carritoId);
    const producto = await productosApi.getById(productId);
    carrito.productos.push(producto);
    await carritoApi.update(carritoId, carrito)
    return res.status(200).send({code: 200, msg: `Carrito ${carritoId} ha sido actualizado`});
})

apiRouter.delete('/carrito/:id/productos/:id_prod', async (req, res) => { 
    const carritoId = parseInt(req.params.id);
    const productId = parseInt(req.params.id_prod);
    const carrito = await carritoApi.getById(carritoId);
    if(!carrito) {
        return res.status(400).send({code: 400, msg: `Mala Peticion: El carrito ${carritoId} no existe`})
    }
    await carritoApi.deleteById(productId, carrito.productos);

    return res.status(200).send({code: 200, msg: `Producto eliminado del carrito ${carritoId} con éxito`})

})


export default apiRouter;
