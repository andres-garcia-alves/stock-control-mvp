import { IStock, IPlainStock } from 'src/app/interfaces';

export class Stock implements IStock {
  producto = 0;
  tienda = 0;
  cantidad = 0;

  constructor(plainStock?: IPlainStock) {
    if (plainStock) {
        this.producto = plainStock.productoId;
        this.tienda = plainStock.localId;
        this.cantidad = plainStock.cantidad;
    }
  }
}
