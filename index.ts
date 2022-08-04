// Desafío 2: MANEJO DE ARCHIVOS.

const fs = require("fs");

interface product { // interface para la estructura de los productos
  id: number;
  title: string;
  thumbnail?: string;
  price: number;
}

class Contenedor {
  ruta: string;

  constructor(ruta: string) {
    this.ruta = ruta;
  }

  async save(object: object) { // Guarda nuevos productos en la lista
    const productList = await this.getAll();
    let newId: number;
    if (productList.length == 0) { // Revisa si ya existen productos en el archivo
      newId = 1;
    } else {
      newId = productList[productList.length - 1].id + 1;
    }

    const product = { id: newId, ...object };
    productList.push(product);
    fs.promises.writeFile(this.ruta, JSON.stringify(productList));
    return product.id;
  }

  async getById(num: number): Promise<unknown> { // Devuelve el producto con base en el ID
    try {
      const productList = await this.getAll();
      const matchedList = productList.filter(
        (product: product) => product.id === num
      );
      if (matchedList.length === 0) {
        return `No existe ningun producto con el ID ${num} en la lista`;
      } else {
        return matchedList;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getAll(): Promise<Array<any>> { // Devuelve toda la lista de productos
    try {
      const productList = await fs.promises.readFile(this.ruta, "utf-8");
      return JSON.parse(productList);
    } catch (error) {
      return [];
    }
  }

  async deleteById(num: number): Promise<void> { //Elimina un elemento de la lista de productos
    const productList: Object[] = await this.getAll();
    const matchedList = productList.filter(
      (product: product) => product.id === num
    );
    if (matchedList.length === 0) {
      console.log("No existe elemento con ese ID en la lista de productos");
    } else {
      const indexToDelete: number = productList.indexOf(matchedList[0]); // Encuentra el lugar en el arreglo original del producto a borrar
      productList.splice(indexToDelete);
      fs.promises.writeFile(this.ruta, JSON.stringify(productList)); // sobreescribe archivo original con nuevo arreglo
      return;
    }
  }
  async deleteAll(): Promise<void> { // Borra toda la lista
    fs.promises.writeFile(this.ruta, '');
    return;
  }
}

async function main() {
  let product1 = new Contenedor("./files/productos.json");  // Pruebas con el JSON
  console.log(await product1.getById(1));
  console.log(await product1.save({ titulo: "testdummy", precio: 299 }));
//   console.log(await product1.deleteById(3));
//   product1.deleteAll();
  return console.log('Termine');
}

main();
