import { IProveedor } from 'src/app/interfaces';

export class Proveedor implements IProveedor {
    id = 0;
    direccion = '';
    nombre = '';
    // tslint:disable-next-line:variable-name
    numero_telefono = '';

    constructor(proveedor?: IProveedor) {
        if (proveedor) {
            this.id = proveedor.id;
            this.nombre = proveedor.nombre;
        }
    }
}
