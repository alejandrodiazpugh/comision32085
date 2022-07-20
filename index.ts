// Desafío 1: CLASES.

type Libros = [{ //marca error si lo tengo como type Object[]
    titulo: string,
    autor: string,
}]

class Usuario {
    nombre: string;
    apellidos: string;
    libros: Libros;
    mascotas: string[];

    constructor(nombre:string, apellidos:string, libros: Libros, mascotas:string[]) {
       this.nombre = nombre;
       this.apellidos = apellidos;
       this.libros = libros;
       this.mascotas = mascotas;
    }

    getFullName():string {
        return `${this.nombre} ${this.apellidos}`
    }
    addMascota(mascota:string) {
        return this.mascotas.push(mascota);
    }
    countMascotas():number {
        return this.mascotas.length;
    }
    addBook(title:string, author:string) { // Siento que está redundante
        const libro = {titulo: title, autor: author};
        return this.libros.push(libro);
    }

    getBookNames() {
        return this.libros.map((libro) => libro.titulo ) 
    }
}

const usuario = new Usuario("Alejandro","Diaz Pugh",[{titulo: "Conde de Montecristo", autor: "Alejandro Dumas"}], ["Musi"]);

usuario.addMascota("Tiki");
usuario.addBook("Pride and Prejudice", "Jane Austen")

console.log(usuario.getFullName(), usuario.countMascotas(), usuario.getBookNames())