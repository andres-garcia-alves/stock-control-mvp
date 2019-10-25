import { IProveedor } from 'src/app/interfaces';

export class Proveedor implements IProveedor {
    id = 0;
    nombre = '';

    constructor(proveedor?: IProveedor) {
        if (proveedor) {
            this.id = proveedor.id;
            this.nombre = proveedor.nombre;
        }
    }
}
