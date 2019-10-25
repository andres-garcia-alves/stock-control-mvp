import { IStock } from 'src/app/interfaces';

export class Stock implements IStock {
    id = 0;
    productoId = 0;
    productoNombre = '';
    localId = 0;
    localNombre = '';
    cantidad = 0;

    constructor(stock?: IStock) {
        if (stock) {
            this.id = stock.id;
            this.productoId = stock.productoId;
            this.productoNombre = stock.productoNombre;
            this.localId = stock.localId;
            this.localNombre = stock.localNombre;
            this.cantidad = stock.cantidad;
        }
    }
}
