import { IVenta } from 'src/app/interfaces';

export class Venta implements IVenta {
  usuario = 0;
  producto = 0;
  cantidad = 0;
  fecha = null;
}
