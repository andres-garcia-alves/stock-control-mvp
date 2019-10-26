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
  debug: any;

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

    /*this.productos = [ // TODO: comentar
      { id: 1, codigo_barra: '', nombre: 'Jeans Dama', descripcion: '', precio: 3500 },
      { id: 2, codigo_barra: '', nombre: 'Jeans Caballero', descripcion: '', precio: 3600 },
      { id: 3, codigo_barra: '', nombre: 'Camisa Dama', descripcion: '', precio: 1700 },
      { id: 4, codigo_barra: '', nombre: 'Camisa Caballero', descripcion: '', precio: 1800 },
      { id: 5, codigo_barra: '', nombre: 'Remera Dama', descripcion: '', precio: 1000 },
      { id: 6, codigo_barra: '', nombre: 'Remera Caballero', descripcion: '', precio: 1200 }
    ];*/

    /*this.locales = [ // TODO: comentar
      { id: 1, direccion: '', nombre: 'Local CABA', numero_telefono: '', sucursula_id: 0 },
      { id: 2, direccion: '', nombre: 'Local Bs As', numero_telefono: '', sucursula_id: 0 },
      { id: 3, direccion: '', nombre: 'Local Rosario', numero_telefono: '', sucursula_id: 0 }
    ];*/

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

    this.accesoDatosService.getProductos()
    .subscribe(response => {
      console.log('getProductos()', response);
      this.productos = response;
      this.loading = false;
    });

    this.accesoDatosService.getLocales()
    .subscribe(response => {
      console.log('getLocales()', response);
      this.locales = response;
      this.loading = false;
    });

    this.accesoDatosService.getStock()
    .subscribe(response => {
      console.log('getStock()', response);
      // this.stock = response; // TODO: update desde back-end
      this.loading = false;
    });

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

      console.log('CREATE', this.seleccionado);
      const aux: IStock = this.seleccionado;

      this.accesoDatosService.postStock(this.seleccionado)
      .subscribe(response => {
        console.log('postStock()', response);
        // aux.id = response; // // TODO: update desde back-end
        aux.id = Math.max.apply(Math, this.stock.map(x => x.id)) + 1; // TODO: comentar
        this.stock.push(this.seleccionado);
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE', this.seleccionado);

      this.accesoDatosService.putStock(this.seleccionado)
      .subscribe(response => {
        console.log('putStock()', response);
        this.loading = false;
      });
    }

    this.filter();
    this.unselect();
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }

    this.loading = true;
    console.log('DELETE', this.seleccionado.id);

    this.accesoDatosService.deleteStock(this.seleccionado.id)
    .subscribe(response => {
      console.log('deleteStock()', response);
      this.loading = false;
    });

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
