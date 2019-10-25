import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILocal, IProducto, IStock } from 'src/app/interfaces';
import { Stock } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-stock-actualizar',
  templateUrl: './stock-actualizar.component.html',
  styleUrls: ['./stock-actualizar.component.css']
})
export class StockActualizarComponent implements OnInit {

  loading: boolean;
  validaciones: string;

  stock: IStock[] = [];
  locales: ILocal[] = [];
  productos: IProducto[] = [];

  seleccionado: IStock = new Stock();
  seleccionadoBackup: IStock = new Stock();
  stockForm: FormGroup;

  filtroProducto = '';
  filtroLocal = 'CABA';
  filteredStock: IStock[];

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {

    this.loading = true;

    this.stockForm = new FormGroup({
      selectProductos: new FormControl(''),
      selectLocales: new FormControl(''),
      inputCantidad: new FormControl('')
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
      { id: 3, productoId: 1, productoNombre: 'Jeans Dama', localId: 3, localNombre: 'Local Rosario', cantidad: 7 },
      { id: 4, productoId: 2, productoNombre: 'Jeans Caballero', localId: 1, localNombre: 'Local CABA', cantidad: 12 },
      { id: 5, productoId: 2, productoNombre: 'Jeans Caballero', localId: 2, localNombre: 'Local Bs As', cantidad: 6 },
      { id: 6, productoId: 2, productoNombre: 'Jeans Caballero', localId: 3, localNombre: 'Local Rosario', cantidad: 6 },
      { id: 7, productoId: 3, productoNombre: 'Camisa Dama', localId: 1, localNombre: 'Local CABA', cantidad: 16 },
      { id: 8, productoId: 3, productoNombre: 'Camisa Dama', localId: 2, localNombre: 'Local Bs As', cantidad: 10 },
      { id: 9, productoId: 3, productoNombre: 'Camisa Dama', localId: 3, localNombre: 'Local Rosario', cantidad: 11 }
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

    this.filter();
  }

  select(stock: IStock) {
    this.seleccionado = stock;
    this.seleccionadoBackup = new Stock(stock);

    this.stockForm.controls.selectProductos.disable();
    this.stockForm.controls.selectLocales.disable();
    this.stockForm.controls.inputCantidad.setValue(stock.cantidad);
  }

  unselect() {
    const index = this.stock.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.stock[index] = this.seleccionadoBackup;
    this.filter();

    this.seleccionado = new Stock();
    this.validaciones = '';

    this.stockForm.controls.selectProductos.setValue('');
    this.stockForm.controls.selectProductos.enable();
    this.stockForm.controls.selectLocales.setValue('');
    this.stockForm.controls.selectLocales.enable();
    this.stockForm.controls.inputCantidad.setValue('');
  }

  filter() {
    this.filteredStock = this.stock.filter(
      x => x.productoNombre.includes(this.filtroProducto) && x.localNombre.includes(this.filtroLocal));
  }

  selectProductosOnChange(event: Event) {
    // tslint:disable-next-line:no-string-literal
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectElementText = selectedOptions[selectedIndex].text;
    const selectElementValue = selectedOptions[selectedIndex].value;

    this.seleccionado.productoId = selectElementValue;
    this.seleccionado.productoNombre = selectElementText;
  }

  selectLocalesOnChange(event: Event) {
    // tslint:disable-next-line:no-string-literal
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectElementText = selectedOptions[selectedIndex].text;
    const selectElementValue = selectedOptions[selectedIndex].value;

    this.seleccionado.localId = selectElementValue;
    this.seleccionado.localNombre = selectElementText;
  }

  inputCantidadOnChange() {
    this.seleccionado.cantidad = this.stockForm.controls.inputCantidad.value;
  }

  addOrEdit() {

    if (this.formValidation() === false) { return; }

    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('CREATE, seleccionado:', this.seleccionado);
      const aux: IStock = this.seleccionado;

      this.accesoDatosService.postStock(this.seleccionado)
        .subscribe(result => {
          this.stock.push(this.seleccionado);
          // aux.id = result; // // TODO: update desde back-end
          aux.id = Math.max.apply(Math, this.stock.map(x => x.id)) + 1; // TODO: comentar
          this.loading = false;
      });

    } else { // update

      console.log('UPDATE, seleccionado:', this.seleccionado);

      this.accesoDatosService.putStock(this.seleccionado)
        .subscribe(result => {
          this.loading = false;
        });
    }

    this.filter();
    this.unselect();
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }

    this.loading = true;
    console.log('DELETE, Id:', this.seleccionado.id);

    this.accesoDatosService.deleteStock(this.seleccionado.id)
      .subscribe(result => { this.loading = false; });

    this.stock = this.stock.filter(x => x !== this.seleccionado);

    this.filter();
    this.unselect();
  }

  formValidation(): boolean {

    this.validaciones = '';

    if (this.seleccionado.productoId === 0 ||  this.seleccionado.productoNombre === '') {
      this.validaciones += 'Falta elegir el producto.\n';
    }

    if (this.seleccionado.localId === 0 || this.seleccionado.localNombre === '') {
      this.validaciones += 'Falta elegir el local.\n';
    }

    if (this.seleccionado.cantidad <= 0) {
      this.validaciones += 'Falta completar la cantidad.\n';
    }
    if (this.seleccionado.cantidad > 9999) {
      this.validaciones += 'Cantidad inválida. Máximo $9999.\n';
    }
    if (this.seleccionado.cantidad % 1 !== 0) {
      this.validaciones += 'Cantidad inválida. Ingrese un número entero.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
