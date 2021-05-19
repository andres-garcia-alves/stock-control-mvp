import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILocal, IProducto, IStock, IPlainStock } from 'src/app/interfaces';
import { PlainStock, Stock, TransferirStock } from 'src/app/entidades';
import { LocalesService } from 'src/app/services/locales.service';
import { ProductosService } from 'src/app/services/productos.service';
import { StockService } from 'src/app/services/stock.service';
import { StockTransferirService } from 'src/app/services/stock-transferir.service';

@Component({
  selector: 'app-stock-transferir',
  templateUrl: './stock-transferir.component.html',
  styleUrls: ['./stock-transferir.component.css']
})
export class StockTransferirComponent implements OnInit {

  debug: any;
  loading: boolean;
  messages: string;

  locales: ILocal[] = [];
  productos: IProducto[] = [];
  plainStock: IPlainStock[] = [];

  seleccionado: IPlainStock = new PlainStock();
  stockForm: FormGroup;

  filtroProducto = '';
  filtroLocal = '';
  filteredStock: IPlainStock[];

  constructor(private localesService: LocalesService, private productosService: ProductosService,
    private stockService: StockService, private stockTransferirService: StockTransferirService) { }

  ngOnInit() {
    this.loading = true;

    this.stockForm = new FormGroup({
      destino: new FormControl(''),
      cantidad: new FormControl('')
    });

    this.localesService.getLocales()
    .subscribe(response => {
      console.log('getLocales()', response);
      this.locales = response;

      this.productosService.getProductos()
      .subscribe(response2 => {
        console.log('getProductos()', response2);
        this.productos = response2;

        this.stockService.getStocks()
        .subscribe(response3 => {
          console.log('getStock()', response3);
          this.buildPlainStockFromResponse(response3);
          this.loading = false;
          this.filter();
        });
      });
    });

    this.stockForm.controls.destino.setValue(0);
  }

  buildPlainStockFromResponse(response: IStock[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < response.length; i++) {
      const aux = this.buildPlainStockFromStock(response[i]);
      this.plainStock.push(aux);
      console.log('aux', aux);
    }
  }

  buildPlainStockFromStock(stock: IStock): IPlainStock {
    const aux = new PlainStock();
    aux.id = stock.id;
    aux.localId = stock.tienda;
    aux.localNombre = this.locales.find(x => x.id === stock.tienda).nombre;
    aux.productoId = stock.producto;
    aux.productoNombre = this.productos.find(x => x.id === stock.producto).nombre;
    aux.cantidad = stock.cantidad;

    return aux;
  }

  select(stock: IPlainStock) {
    this.seleccionado = stock;
  }

  unselect() {
    this.seleccionado = new PlainStock();
    this.messages = '';

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

    // para el POST
    const transferirStock = new TransferirStock();
    transferirStock.productoId = this.seleccionado.productoId;
    transferirStock.localOrigenId = this.seleccionado.localId;
    transferirStock.localDestinoId = this.stockForm.controls.destino.value;
    transferirStock.cantidad = this.stockForm.controls.cantidad.value;

    // por si hay que actualizar la UI
    const newStock = new PlainStock();
    newStock.id = Math.max.apply(Math, this.plainStock.map(x => x.id)) + 1;
    newStock.localId = this.stockForm.controls.destino.value;
    newStock.localNombre = this.locales.find(x => x.id === this.stockForm.controls.destino.value).nombre;
    newStock.productoId = this.seleccionado.productoId;
    newStock.productoNombre = this.seleccionado.productoNombre;
    newStock.cantidad = this.stockForm.controls.cantidad.value;

    console.log('TransferirStock', transferirStock);
    this.stockTransferirService.postTransferirStock(transferirStock)
    .subscribe(response => {
      console.log('postTransferirStock()', response);
      this.seleccionado.cantidad -= transferirStock.cantidad;
      const existe = this.plainStock.find(x => x.productoId === newStock.productoId && x.localId === newStock.localId);
      if (existe) { existe.cantidad += newStock.cantidad; } else { this.plainStock.push(newStock); }

      this.filter();
      this.unselect();
      this.loading = false;
    }, error => {
      this.messages = error;
      this.loading = false;
    });
  }

  transferir2() {

    if (this.formValidation() === false) { return; }
    this.loading = true;

    const existeDestino = this.plainStock.find(
      x => x.productoId === this.seleccionado.productoId && x.localId === this.stockForm.controls.destino.value);

    // en este caso se resta la cantidad a transferir
    const newStockOri = new Stock();
    newStockOri.id = this.seleccionado.id;
    newStockOri.producto = this.seleccionado.productoId;
    newStockOri.tienda = this.seleccionado.localId;
    newStockOri.cantidad = this.seleccionado.cantidad - this.stockForm.controls.cantidad.value;
    console.log('aux origen', newStockOri);

    // en este caso se suma la cantidad a transferir
    const newStockDest = new Stock();
    newStockDest.id = (existeDestino) ? existeDestino.id : 0;
    newStockDest.producto = this.seleccionado.productoId;
    newStockDest.tienda = this.stockForm.controls.destino.value;
    newStockDest.cantidad = (existeDestino) ?
      existeDestino.cantidad + this.stockForm.controls.cantidad.value : this.stockForm.controls.cantidad.value;
    console.log('aux destino', newStockDest);


    this.stockService.putStock(newStockOri)
    .subscribe(response => {
      console.log('putStock(origen)', response);

      // actualizar UI
      this.seleccionado.cantidad -= this.stockForm.controls.cantidad.value;

      if (existeDestino) { // actualizar el stock destino

        this.stockService.putStock(newStockDest)
        .subscribe(response2 => {
          console.log('putStock(destino)', response2);

          // actualizar UI
          existeDestino.cantidad += this.stockForm.controls.cantidad.value;

          this.filter();
          this.unselect();
          this.loading = false;
        });

      } else { // crear nuevo stock destino

        this.stockService.postStock(newStockDest)
        .subscribe(response2 => {
          console.log('postStock(destino)', response2);

          // actualizar UI
          const aux = this.buildPlainStockFromStock(response2);
          this.plainStock.push(aux);

          this.filter();
          this.unselect();
          this.loading = false;
          });
      }
    }, error => {
      this.messages = error;
      this.loading = false;
    });
  }

  formValidation(): boolean {

    this.messages = '';

    if (this.seleccionado.id === 0) {
      this.messages += 'Falta elegir el producto a transferir.\n';
    }

    if (this.stockForm.controls.destino.value === 0 || this.stockForm.controls.destino.value === '') {
      this.messages += 'Falta elegir el local destino.\n';
    }
    if (this.seleccionado.localId ===  this.stockForm.controls.destino.value) {
      this.messages += 'El origen y el destino son los mismos.\n';
    }

    if (this.stockForm.controls.cantidad.value <= 0) {
      this.messages += 'Falta completar la cantidad.\n';
    }
    if (this.stockForm.controls.cantidad.value > this.seleccionado.cantidad) {
      this.messages += 'La cantidad a transferir excede el stock en origen.\n';
    }
    if (this.stockForm.controls.cantidad.value % 1 !== 0) {
      this.messages += 'Cantidad inválida. Ingrese un número entero.\n';
    }

    return (this.messages === '') ? true : false;
  }
}
