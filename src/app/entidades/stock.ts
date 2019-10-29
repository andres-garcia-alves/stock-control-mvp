import { IStock, IPlainStock } from 'src/app/interfaces';

export class Stock implements IStock {
  id = 0;
  producto = 0;
  tienda = 0;
  cantidad = 0;

  constructor(plainStock?: IPlainStock) {
    if (plainStock) {
        this.id = plainStock.id;
        this.producto = plainStock.productoId;
        this.tienda = plainStock.localId;
        this.cantidad = plainStock.cantidad;
    }
  }
}
