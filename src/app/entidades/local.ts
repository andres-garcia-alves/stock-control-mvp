import { ILocal } from 'src/app/interfaces';

export class Local implements ILocal {
    id = 0;
    nombre = '';

    constructor(local?: ILocal) {
        if (local) {
            this.id = local.id;
            this.nombre = local.nombre;
        }
    }
}
