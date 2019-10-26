import { ILocal } from 'src/app/interfaces';

export class Local implements ILocal {
    id = 0;
    direccion = '';
    nombre = '';
    // tslint:disable-next-line:variable-name
    numero_telefono = '';
    // tslint:disable-next-line:variable-name
    sucursula_id = 0;

    constructor(local?: ILocal) {
        if (local) {
            this.id = local.id;
            this.direccion = local.direccion;
            this.nombre = local.nombre;
            this.numero_telefono = local.numero_telefono;
            this.sucursula_id = local.sucursula_id;
        }
    }
}
