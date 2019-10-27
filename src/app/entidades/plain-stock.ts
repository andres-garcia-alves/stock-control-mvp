import { IPlainStock } from 'src/app/interfaces';

export class PlainStock implements IPlainStock {
    id = 0;
    productoId = 0;
    productoNombre = '';
    localId = 0;
    localNombre = '';
    cantidad = 0;

    constructor(stock?: IPlainStock) {
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
