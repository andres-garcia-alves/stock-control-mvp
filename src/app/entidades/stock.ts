import { IStock } from 'src/app/interfaces';

export class Stock implements IStock {
    id = 0;
    productoId = 0;
    productoNombre = '';
    localId = 0;
    localNombre = '';
    cantidad = 0;
}
