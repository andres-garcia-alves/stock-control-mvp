import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILocal, IProducto, IStock, IPlainStock } from 'src/app/interfaces';
import { PlainStock, Stock } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-stock-actualizar',
  templateUrl: './stock-actualizar.component.html',
  styleUrls: ['./stock-actualizar.component.css']
})
export class StockActualizarComponent implements OnInit {

  debug: any;
  loading: boolean;
  validaciones: string;

  locales: ILocal[] = [];
  productos: IProducto[] = [];
  plainStock: IPlainStock[] = [];

  seleccionado: IPlainStock = new PlainStock();
  seleccionadoBackup: IPlainStock = new PlainStock();
  stockForm: FormGroup;

  filtroProducto = '';
  filtroLocal = '';
  filteredStock: IPlainStock[];

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {

    this.loading = true;

    this.stockForm = new FormGroup({
      selectProductos: new FormControl(''),
      selectLocales: new FormControl(''),
      inputCantidad: new FormControl('')
    });

    /*this.locales = [
      { id: 1, direccion: '', nombre: 'Local CABA', numero_telefono: '', sucursula_id: 0 },
      { id: 2, direccion: '', nombre: 'Local Bs As', numero_telefono: '', sucursula_id: 0 },
      { id: 3, direccion: '', nombre: 'Local Rosario', numero_telefono: '', sucursula_id: 0 }
    ];*/

    /*this.productos = [
      { id: 1, codigo_barra: '', nombre: 'Jeans Dama', descripcion: '', precio: 3500 },
      { id: 2, codigo_barra: '', nombre: 'Jeans Caballero', descripcion: '', precio: 3600 },
      { id: 3, codigo_barra: '', nombre: 'Camisa Dama', descripcion: '', precio: 1700 },
      { id: 4, codigo_barra: '', nombre: 'Camisa Caballero', descripcion: '', precio: 1800 },
      { id: 5, codigo_barra: '', nombre: 'Remera Dama', descripcion: '', precio: 1000 },
      { id: 6, codigo_barra: '', nombre: 'Remera Caballero', descripcion: '', precio: 1200 }
    ];*/

    /*this.plainStock = [
      { id: 1, productoId: 1, productoNombre: 'Jeans Dama', localId: 1, localNombre: 'Local CABA', cantidad: 15 },
      { id: 2, productoId: 1, productoNombre: 'Jeans Dama', localId: 2, localNombre: 'Local Bs As', cantidad: 8 },
      { id: 3, productoId: 1, productoNombre: 'Jeans Dama', localId: 3, localNombre: 'Local Rosario', cantidad: 7 },
      { id: 4, productoId: 2, productoNombre: 'Jeans Caballero', localId: 1, localNombre: 'Local CABA', cantidad: 12 },
      { id: 5, productoId: 2, productoNombre: 'Jeans Caballero', localId: 2, localNombre: 'Local Bs As', cantidad: 6 },
      { id: 6, productoId: 2, productoNombre: 'Jeans Caballero', localId: 3, localNombre: 'Local Rosario', cantidad: 6 },
      { id: 7, productoId: 3, productoNombre: 'Camisa Dama', localId: 1, localNombre: 'Local CABA', cantidad: 16 },
      { id: 8, productoId: 3, productoNombre: 'Camisa Dama', localId: 2, localNombre: 'Local Bs As', cantidad: 10 },
      { id: 9, productoId: 3, productoNombre: 'Camisa Dama', localId: 3, localNombre: 'Local Rosario', cantidad: 11 }
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
  }

  buildStockFromResponse(response: IStock[]) {
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

  select(stock: IPlainStock) {
    this.seleccionado = stock;
    this.seleccionadoBackup = new PlainStock(stock);

    this.stockForm.controls.selectProductos.disable();
    this.stockForm.controls.selectLocales.disable();
    this.stockForm.controls.inputCantidad.setValue(stock.cantidad);
  }

  unselect() {
    const index = this.plainStock.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.plainStock[index] = this.seleccionadoBackup;
    this.filter();

    this.seleccionado = new PlainStock();
    this.validaciones = '';

    this.stockForm.controls.selectProductos.setValue('');
    this.stockForm.controls.selectProductos.enable();
    this.stockForm.controls.selectLocales.setValue('');
    this.stockForm.controls.selectLocales.enable();
    this.stockForm.controls.inputCantidad.setValue('');
  }

  filter() {
    this.filteredStock = this.plainStock.filter(
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

    const stock = new Stock(this.seleccionado);

    if (this.seleccionado.id === 0) { // nuevo

      console.log('CREATE', stock);
      this.accesoDatosService.postStock(stock)
      .subscribe(response => {
        console.log('postStock()', response);
        this.seleccionado.id = Math.max.apply(Math, this.plainStock.map(x => x.id)) + 1;
        this.plainStock.push(this.seleccionado);
        this.unselect();
        this.loading = false;
      }, error => {
        this.validaciones = error;
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE', stock);
      this.accesoDatosService.putStock(stock)
      .subscribe(response => {
        console.log('putStock()', response);
        this.unselect();
        this.loading = false;
      }, error => {
        this.validaciones = error;
        this.loading = false;
      });
    }
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }
    this.loading = true;

    console.log('DELETE', this.seleccionado);
    this.accesoDatosService.deleteStock(this.seleccionado.id)
    .subscribe(response => {
      console.log('deleteStock()', response);
      this.plainStock = this.plainStock.filter(x => x !== this.seleccionado);
      this.filter();
      this.unselect();
      this.loading = false;
    }, error => {
      this.validaciones = error;
      this.loading = false;
    });
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
