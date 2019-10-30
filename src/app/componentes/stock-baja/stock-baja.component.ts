import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILocal, IProducto, IStock, IPlainStock } from 'src/app/interfaces';
import { PlainStock, Stock, BajaStock } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-stock-baja',
  templateUrl: './stock-baja.component.html',
  styleUrls: ['./stock-baja.component.css']
})
export class StockBajaComponent implements OnInit {

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
      motivo: new FormControl(''),
      cantidad: new FormControl('')
    });

    /*this.plainStock = [
      { id: 1, productoId: 1, productoNombre: 'Jeans Dama', localId: 1, localNombre: 'Local CABA', cantidad: 15 },
      { id: 4, productoId: 2, productoNombre: 'Jeans Caballero', localId: 1, localNombre: 'Local CABA', cantidad: 12 },
      { id: 7, productoId: 3, productoNombre: 'Camisa Dama', localId: 1, localNombre: 'Local CABA', cantidad: 16 }
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
          this.buildPlainStockFromResponse(response3);
          this.loading = false;
          this.filter();
        });
      });
    });

    this.filter();
    this.stockForm.controls.motivo.setValue(0);
  }

  buildPlainStockFromResponse(response: IStock[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < response.length; i++) {
      const aux = new PlainStock();
      aux.id = response[i].id;
      aux.localId = response[i].tienda;
      aux.localNombre = this.locales.find(x => x.id === response[i].tienda).nombre;
      aux.productoId = response[i].producto;
      aux.productoNombre = this.productos.find(x => x.id === response[i].producto).nombre;
      aux.cantidad = response[i].cantidad;

      this.plainStock.push(aux);
      console.log('aux', aux);
    }
  }

  select(plainStock: IPlainStock) {
    this.seleccionado = plainStock;
  }

  unselect() {
    this.seleccionado = new PlainStock();
    this.validaciones = '';

    this.stockForm.controls.motivo.setValue(0);
    this.stockForm.controls.cantidad.setValue('');
  }

  filter() {
    this.filteredStock = this.plainStock.filter(
      x => x.productoNombre.includes(this.filtroProducto) && x.localNombre.includes(this.filtroLocal));
  }

  delete() {

    if (this.formValidation() === false) { return; }
    if (confirm('Está seguro que desea generar la baja?') === false ) { return; }
    this.loading = true;

    const stock = new Stock(this.seleccionado);
    stock.cantidad -= this.stockForm.controls.cantidad.value;

    this.accesoDatosService.putStock(stock)
    .subscribe(response => {
      console.log('putStock()', response);
      this.seleccionado.cantidad = response.cantidad;
      this.unselect();
      this.loading = false;
    }, error => {
      this.validaciones = error;
      this.loading = false;
    });
  }

  formValidation(): boolean {

    this.validaciones = '';

    if (this.seleccionado.id === 0) {
      this.validaciones += 'Falta elegir el producto a modificar.\n';
    }

    if (this.stockForm.controls.motivo.value === '' || this.stockForm.controls.motivo.value === 0) {
      this.validaciones += 'Falta elegir el motivo de la baja.\n';
    }

    if (this.stockForm.controls.cantidad.value <= 0) {
      this.validaciones += 'Falta completar la cantidad.\n';
    }
    if (this.stockForm.controls.cantidad.value > this.seleccionado.cantidad) {
      this.validaciones += 'La cantidad a dar de baja excede el stock actual.\n';
    }
    if (this.stockForm.controls.cantidad.value % 1 !== 0) {
      this.validaciones += 'Cantidad inválida. Ingrese un número entero.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
