// Desafío 1: CLASES.
var Usuario = /** @class */ (function () {
    function Usuario(nombre, apellidos, libros, mascotas) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    Usuario.prototype.getFullName = function () {
        return "".concat(this.nombre, " ").concat(this.apellidos);
    };
    Usuario.prototype.addMascota = function (mascota) {
        return this.mascotas.push(mascota);
    };
    Usuario.prototype.countMascotas = function () {
        return this.mascotas.length;
    };
    Usuario.prototype.addBook = function (title, author) {
        var libro = { titulo: title, autor: author };
        return this.libros.push(libro);
    };
    Usuario.prototype.getBookNames = function () {
        return this.libros.map(function (libro) { return libro.titulo; });
    };
    return Usuario;
}());
var usuario = new Usuario("Alejandro", "Diaz Pugh", [{ titulo: "Conde de Montecristo", autor: "Alejandro Dumas" }], ["Musi"]);
usuario.addMascota("Tiki");
usuario.addBook("Pride and Prejudice", "Jane Austen");
console.log(usuario.getFullName(), usuario.countMascotas(), usuario.getBookNames());
