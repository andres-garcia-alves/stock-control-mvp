import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILocal, IProducto, IStock, IPlainStock } from 'src/app/interfaces';
import { PlainStock, Stock } from 'src/app/entidades';
import { LocalesService } from 'src/app/services/locales.service';
import { ProductosService } from 'src/app/services/productos.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-actualizar',
  templateUrl: './stock-actualizar.component.html',
  styleUrls: ['./stock-actualizar.component.css']
})
export class StockActualizarComponent implements OnInit {

  debug: any;
  loading: boolean;
  messages: string;

  locales: ILocal[] = [];
  productos: IProducto[] = [];
  plainStock: IPlainStock[] = [];

  seleccionado: IPlainStock = new PlainStock();
  seleccionadoBackup: IPlainStock = new PlainStock();
  stockForm: FormGroup;

  filtroProducto = '';
  filtroLocal = '';
  filteredStock: IPlainStock[];

  constructor(private localesService: LocalesService, private productosService: ProductosService,
    private stockService: StockService) { }

  async ngOnInit() {

    this.loading = true;

    this.stockForm = new FormGroup( {
      selectProductos: new FormControl(''),
      selectLocales: new FormControl(''),
      inputCantidad: new FormControl('')
    });

    try {
      const response = await this.localesService.getLocales();
      console.log('getLocales()', response);

      const response2 = await this.productosService.getProductos();
      console.log('getProductos()', response2);

      const response3 = await this.stockService.getStocks();
      console.log('getStock()', response3);

      this.locales = response;
      this.productos = response2;
      this.buildPlainStockFromResponse(response3);
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; this.filter(); }
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
    this.seleccionadoBackup = new PlainStock(plainStock);

    this.stockForm.controls.selectProductos.disable();
    this.stockForm.controls.selectLocales.disable();
    this.stockForm.controls.inputCantidad.setValue(plainStock.cantidad);
  }

  unselect() {
    const index = this.plainStock.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.plainStock[index] = this.seleccionadoBackup;
    this.filter();

    this.seleccionado = new PlainStock();
    this.messages = '';

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

  async addOrEdit() {

    if (this.formValidation() === false) { return; }
    this.loading = true;

    const stock = new Stock(this.seleccionado);

    if (this.seleccionado.id === 0) { // nuevo
      console.log('CREATE', stock);

      try {
        const response = await this.stockService.postStock(stock)
        console.log('postStock()', response);

        this.seleccionado.id = Math.max.apply(Math, this.plainStock.map(x => x.id)) + 1;
        this.plainStock.push(this.seleccionado);
        this.unselect();
      }
      catch (error) { this.messages = error; }
      finally { this.loading = false; }

    } else { // update
      console.log('UPDATE', stock);

      try {
        const response = await this.stockService.putStock(stock)
        console.log('putStock()', response);

        this.unselect();
      }
      catch (error) { this.messages = error; }
      finally { this.loading = false; }
    }
  }

  async delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }

    this.loading = true;
    console.log('DELETE', this.seleccionado);

    try {
      const response = await this.stockService.deleteStock(this.seleccionado.id)
      console.log('deleteStock()', response);

      this.plainStock = this.plainStock.filter(x => x !== this.seleccionado);
      this.filter();
      this.unselect();
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  formValidation(): boolean {
    this.messages = '';

    if (this.seleccionado.productoId === 0 ||  this.seleccionado.productoNombre === '') {
      this.messages += 'Falta elegir el producto.\n';
    }
    if (this.seleccionado.localId === 0 || this.seleccionado.localNombre === '') {
      this.messages += 'Falta elegir el local.\n';
    }
    if (this.seleccionado.cantidad <= 0) {
      this.messages += 'Falta completar la cantidad.\n';
    }
    if (this.seleccionado.cantidad > 9999) {
      this.messages += 'Cantidad inválida. Máximo $9999.\n';
    }
    if (this.seleccionado.cantidad % 1 !== 0) {
      this.messages += 'Cantidad inválida. Ingrese un número entero.\n';
    }

    return (this.messages === '') ? true : false;
  }
}
