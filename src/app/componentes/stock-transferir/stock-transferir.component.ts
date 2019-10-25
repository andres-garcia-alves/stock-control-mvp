import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILocal, IProducto, IStock } from 'src/app/interfaces';
import { Stock, TransferirStock } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-stock-transferir',
  templateUrl: './stock-transferir.component.html',
  styleUrls: ['./stock-transferir.component.css']
})
export class StockTransferirComponent implements OnInit {

  loading: boolean;
  validaciones: string;

  stock: IStock[] = [];
  locales: ILocal[] = [];
  productos: IProducto[] = [];

  seleccionado: IStock = new Stock();
  stockForm: FormGroup;

  filtroProducto = '';
  filtroLocal = 'CABA';
  filteredStock: IStock[];

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    this.stockForm = new FormGroup({
      destino: new FormControl(''),
      cantidad: new FormControl('')
    });

    this.accesoDatosService.getStock()
    .subscribe(result => {
      // this.stock = result; // TODO: update desde back-end
      this.loading = false;
    });

    this.accesoDatosService.getLocales()
    .subscribe(result => {
      // this.locales = result; // TODO: update desde back-end
      this.loading = false;
    });

    this.accesoDatosService.getProductos()
    .subscribe(result => {
      // this.productos = result; // TODO: update desde back-end
      this.loading = false;
    });

    this.stock = [ // TODO: comentar
      { id: 1, productoId: 1, productoNombre: 'Jeans Dama', localId: 1, localNombre: 'Local CABA', cantidad: 15 },
      { id: 2, productoId: 1, productoNombre: 'Jeans Dama', localId: 2, localNombre: 'Local Bs As', cantidad: 8 },
      // { id: 3, productoId: 1, productoNombre: 'Jeans Dama', localId: 3, localNombre: 'Local Rosario', cantidad: 7 },
      { id: 4, productoId: 2, productoNombre: 'Jeans Caballero', localId: 1, localNombre: 'Local CABA', cantidad: 12 },
      { id: 5, productoId: 2, productoNombre: 'Jeans Caballero', localId: 2, localNombre: 'Local Bs As', cantidad: 6 },
      // { id: 6, productoId: 2, productoNombre: 'Jeans Caballero', localId: 3, localNombre: 'Local Rosario', cantidad: 6 },
      { id: 7, productoId: 3, productoNombre: 'Camisa Dama', localId: 1, localNombre: 'Local CABA', cantidad: 16 },
      { id: 8, productoId: 3, productoNombre: 'Camisa Dama', localId: 2, localNombre: 'Local Bs As', cantidad: 10 },
      // { id: 9, productoId: 3, productoNombre: 'Camisa Dama', localId: 3, localNombre: 'Local Rosario', cantidad: 11 }
    ];

    this.locales = [ // TODO: comentar
      { id: 1, nombre: 'Local CABA' },
      { id: 2, nombre: 'Local Bs As' },
      { id: 3, nombre: 'Local Rosario' }
    ];

    this.productos = [ // TODO: comentar
      { id: 1, nombre: 'Jeans Dama', precio: 3500 },
      { id: 2, nombre: 'Jeans Caballero', precio: 3600 },
      { id: 3, nombre: 'Camisa Dama', precio: 1700 },
      { id: 4, nombre: 'Camisa Caballero', precio: 1800 },
      { id: 5, nombre: 'Remera Dama', precio: 1000 },
      { id: 6, nombre: 'Remera Caballero', precio: 1200 }
    ];

    this.stockForm.controls.destino.setValue(0);
    this.filter();
  }

  select(stock: IStock) {
    this.seleccionado = stock;
  }

  unselect() {
    this.seleccionado = new Stock();
    this.validaciones = '';

    this.stockForm.controls.destino.setValue(0);
    this.stockForm.controls.cantidad.setValue('');
  }

  filter() {
    this.filteredStock = this.stock.filter(
      x => x.productoNombre.includes(this.filtroProducto) && x.localNombre.includes(this.filtroLocal));
  }

  transferir() {

    if (this.formValidation() === false) { return; }

    const transferirStock = new TransferirStock();
    transferirStock.productoId = this.seleccionado.id;
    transferirStock.localOrigenId = this.seleccionado.localId;
    transferirStock.localDestinoId = this.stockForm.controls.destino.value;
    transferirStock.cantidad = this.stockForm.controls.cantidad.value;

    this.loading = true;

    console.log(transferirStock);
    this.accesoDatosService.postTransferirStock(transferirStock)
      .subscribe(result => { this.loading = false; });

    const newStock = new Stock();
    newStock.id = Math.max.apply(Math, this.stock.map(x => x.id)) + 1; // TODO: comentar
    newStock.localId = this.stockForm.controls.destino.value;
    newStock.localNombre = this.locales.find(x => x.id === this.stockForm.controls.destino.value).nombre;
    newStock.productoId = this.seleccionado.productoId;
    newStock.productoNombre = this.seleccionado.productoNombre;
    newStock.cantidad = this.stockForm.controls.cantidad.value;

    // actualizar UI
    this.seleccionado.cantidad -= transferirStock.cantidad;

    const existe = this.stock.find(x => x.productoId === newStock.productoId && x.localId === newStock.localId);
    if (existe) { existe.cantidad += newStock.cantidad; } else { this.stock.push(newStock); }

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