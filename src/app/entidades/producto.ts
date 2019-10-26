import { IProducto } from 'src/app/interfaces';

export class Producto implements IProducto {
    id = 0;
    // tslint:disable-next-line:variable-name
    codigo_barra = '';
    nombre = '';
    descripcion = '';
    precio = null;

    constructor(producto?: IProducto) {
        if (producto) {
            this.id = producto.id;
            this.codigo_barra = producto.codigo_barra;
            this.nombre = producto.nombre;
            this.descripcion = producto.descripcion;
            this.precio = producto.precio;
        }
    }
}
