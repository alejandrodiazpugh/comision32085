import fs from 'fs';

export interface product {
	id?: number;
	timestamp?: string;
	nombre: string;
	descripcion: string;
	codigo: string;
	url: string;
	precio: number;
	stock: number;
}

export interface carrito {
    id?: number,
    timestamp?: string;
    productos?: product;
}

export default class Contenedor {
	ruta: string;

	constructor(ruta: string) {
		this.ruta = ruta;
	}

	private static timestamp(): string {
		let date = new Date();
		return `${date.getDate()}/${
			date.getMonth() + 1
		}/${date.getFullYear()} ${date.toTimeString().split(' ')[0]}`;
	}

	async save(object: object) {
		const productList = await this.getAll();

		let id: number;
		if (productList.length == 0) {
			id = 1;
		} else {
			id = productList[productList.length - 1].id + 1;
		}

		const product = {
			id: id,
			timestamp: Contenedor.timestamp(),
			...object,
		};
		productList.push(product);
		fs.promises.writeFile(this.ruta, JSON.stringify(productList));
		return product.id;
	}

	async getById(id: number): Promise<any> {
		try {
			const list = await this.getAll();
			const match = list.find(
				(product: product) => product.id === id
			);
			return match;
		} catch (err) {
			return err;
		}
	}

	async getAll(): Promise<any> {
		try {
			const productList = await fs.promises.readFile(this.ruta, 'utf-8');
			return JSON.parse(productList);
		} catch (error) {
			return [];
		}
	}

	async deleteById(id: number, carrito?: carrito): Promise<void> {
		let productList: product[] = await this.getAll()
		const match = productList.find((product) => product.id === id);
		if (!match) {
			return;
		}
		const indexToDelete: number = productList.indexOf(match[0]);
		productList.splice(indexToDelete);
		fs.promises.writeFile(this.ruta, JSON.stringify(productList));
		return;
	}

    // async deleteObjectById(id: number, object: product): Promise<void> {
	// 	let product: product =  object; 
    //     if(!product.id) {
    //         return
    //     }
	// 	const indexToDelete = product.id
	// 	fs.promises.writeFile(this.ruta, JSON.stringify(productList));
	// 	return;
	// }

	async deleteAll(): Promise<void> {
		fs.promises.writeFile(this.ruta, '');
		return;
	}

	async update(id: number, object: product): Promise<void> {
		// TODO: PODER MODIFICAR CADA CAMPO DEL OBJETO POR SEPARADO
		const productList: product[] = await this.getAll();
		productList.forEach((product) => {
			const thisId = product.id;
			if (thisId == product.id) {
				const timestamp = Contenedor.timestamp();
				product = { id, timestamp, ...object };
                productList.splice((id-1), 1, product);
			}
		});
		fs.promises.writeFile(this.ruta, JSON.stringify(productList));
	}
}
