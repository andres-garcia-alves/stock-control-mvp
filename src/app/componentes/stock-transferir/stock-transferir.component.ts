import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILocal, IProducto, IStock, IPlainStock } from 'src/app/interfaces';
import { PlainStock, Stock, TransferirStock } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-stock-transferir',
  templateUrl: './stock-transferir.component.html',
  styleUrls: ['./stock-transferir.component.css']
})
export class StockTransferirComponent implements OnInit {

  debug: any;
  loading: boolean;
  validaciones: string;

  locales: ILocal[] = [];
  productos: IProducto[] = [];
  plainStock: IPlainStock[] = [];

  seleccionado: IPlainStock = new PlainStock();
  stockForm: FormGroup;

  filtroProducto = '';
  filtroLocal = '';
  filteredStock: IPlainStock[];

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    this.stockForm = new FormGroup({
      destino: new FormControl(''),
      cantidad: new FormControl('')
    });

    /*this.locales = [
      { id: 1, direccion: '', nombre: 'Local CABA', numero_telefono: '', sucursula_id: 0 },
      { id: 2, direccion: '', nombre: 'Local Bs As', numero_telefono: '', sucursula_id: 0 },
      { id: 3, direccion: '', nombre: 'Local Rosario', numero_telefono: '', sucursula_id: 0 }
    ];*/

    /*this.plainStock = [
      { id: 1, productoId: 1, productoNombre: 'Jeans Dama', localId: 1, localNombre: 'Local CABA', cantidad: 15 },
      { id: 2, productoId: 1, productoNombre: 'Jeans Dama', localId: 2, localNombre: 'Local Bs As', cantidad: 8 },
      { id: 4, productoId: 2, productoNombre: 'Jeans Caballero', localId: 1, localNombre: 'Local CABA', cantidad: 12 },
      { id: 5, productoId: 2, productoNombre: 'Jeans Caballero', localId: 2, localNombre: 'Local Bs As', cantidad: 6 },
      { id: 7, productoId: 3, productoNombre: 'Camisa Dama', localId: 1, localNombre: 'Local CABA', cantidad: 16 },
      { id: 8, productoId: 3, productoNombre: 'Camisa Dama', localId: 2, localNombre: 'Local Bs As', cantidad: 10 }
    ];*/

    this.accesoDatosService.getLocales()
    .subscribe(response => {
      console.log('getLocales()', response);
      this.locales = response;

      this.accesoDatosService.getProductos()
      .subscribe(response2 => {
        console.log('getProductos()', response2);
        this.productos = response2;

        this.accesoDatosService.getStocks()
        .subscribe(response3 => {
          console.log('getStock()', response3);
          this.buildStockFromResponse(response3);
          this.loading = false;
          this.filter();
        });
      });
    });

    this.stockForm.controls.destino.setValue(0);
  }

  buildStockFromResponse(response: IStock[]) {
    for (let i = 0; i < response.length; i++) {

      const aux = new PlainStock();
      aux.id = i + 1;
      aux.localId = response[i].tienda;
      aux.localNombre = this.locales.find(x => x.id === response[i].tienda).nombre;
      aux.productoId = response[i].producto;
      aux.productoNombre = this.productos.find(x => x.id === response[i].producto).nombre;
      aux.cantidad = response[i].cantidad;

      this.plainStock.push(aux);
      console.log('aux', aux);
    }
  }

  select(stock: IPlainStock) {
    this.seleccionado = stock;
  }

  unselect() {
    this.seleccionado = new PlainStock();
    this.validaciones = '';

    this.stockForm.controls.destino.setValue(0);
    this.stockForm.controls.cantidad.setValue('');
  }

  filter() {
    this.filteredStock = this.plainStock.filter(
      x => x.productoNombre.includes(this.filtroProducto) && x.localNombre.includes(this.filtroLocal));
  }

  transferir() {

    if (this.formValidation() === false) { return; }
    this.loading = true;

    const transferirStock = new TransferirStock();
    transferirStock.productoId = this.seleccionado.id;
    transferirStock.localOrigenId = this.seleccionado.localId;
    transferirStock.localDestinoId = this.stockForm.controls.destino.value;
    transferirStock.cantidad = this.stockForm.controls.cantidad.value;
    console.log('TransferirStock', transferirStock);

    this.accesoDatosService.postTransferirStock(transferirStock)
    .subscribe(response => {
      console.log('postTransferirStock()', response);
      this.loading = false;
    });

    // actualizar UI
    const newStock = new PlainStock();
    newStock.id = Math.max.apply(Math, this.plainStock.map(x => x.id)) + 1;
    newStock.localId = this.stockForm.controls.destino.value;
    newStock.localNombre = this.locales.find(x => x.id === this.stockForm.controls.destino.value).nombre;
    newStock.productoId = this.seleccionado.productoId;
    newStock.productoNombre = this.seleccionado.productoNombre;
    newStock.cantidad = this.stockForm.controls.cantidad.value;

    this.seleccionado.cantidad -= transferirStock.cantidad;

    const existe = this.plainStock.find(x => x.productoId === newStock.productoId && x.localId === newStock.localId);
    if (existe) { existe.cantidad += newStock.cantidad; } else { this.plainStock.push(newStock); }

    this.filter();
    this.unselect();
  }

  formValidation(): boolean {

    this.validaciones = '';

    if (this.seleccionado.id === 0) {
      this.validaciones += 'Falta elegir el producto a transferir.\n';
    }

    if (this.stockForm.controls.destino.value === 0 || this.stockForm.controls.destino.value === '') {
      this.validaciones += 'Falta elegir el local destino.\n';
    }
    if (this.seleccionado.localId ===  this.stockForm.controls.destino.value) {
      this.validaciones += 'El origen y el destino son los mismos.\n';
    }

    if (this.stockForm.controls.cantidad.value <= 0) {
      this.validaciones += 'Falta completar la cantidad.\n';
    }
    if (this.stockForm.controls.cantidad.value > this.seleccionado.cantidad) {
      this.validaciones += 'La cantidad a transferir excede el stock en origen.\n';
    }
    if (this.stockForm.controls.cantidad.value % 1 !== 0) {
      this.validaciones += 'Cantidad inválida. Ingrese un número entero.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
