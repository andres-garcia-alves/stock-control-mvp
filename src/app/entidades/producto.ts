import { IProducto } from 'src/app/interfaces';

export class Producto implements IProducto {
    id = 0;
    nombre = '';
    precio = null;

    constructor(producto?: IProducto) {
        if (producto) {
            this.id = producto.id;
            this.nombre = producto.nombre;
            this.precio = producto.precio;
        }
    }
}
