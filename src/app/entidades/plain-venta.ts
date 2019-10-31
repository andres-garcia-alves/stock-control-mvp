import { IPlainVenta } from 'src/app/interfaces';

export class PlainVenta implements IPlainVenta {
  id = 0;
  fecha: Date;
  productoId = 0;
  productoNombre = '';
  usuarioId = 0;
  usuarioNombre = '';
  cantidad = 0;

  constructor(venta?: IPlainVenta) {
    if (venta) {
        this.id = venta.id;
        this.fecha = venta.fecha;
        this.productoId = venta.productoId;
        this.productoNombre = venta.productoNombre;
        this.usuarioId = venta.usuarioId;
        this.usuarioNombre = venta.usuarioNombre;
        this.cantidad = venta.cantidad;
    }
  }
}
