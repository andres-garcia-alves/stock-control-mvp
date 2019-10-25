import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStock } from 'src/app/interfaces';
import { Stock, BajaStock } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-stock-baja',
  templateUrl: './stock-baja.component.html',
  styleUrls: ['./stock-baja.component.css']
})
export class StockBajaComponent implements OnInit {

  loading: boolean;
  validaciones: string;

  stock: IStock[];

  seleccionado: IStock = new Stock();
  stockForm: FormGroup;

  filtroProducto = '';
  filteredStock: IStock[];

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    this.stockForm = new FormGroup({
      cantidad: new FormControl(''),
      motivo: new FormControl('')
    });

    this.accesoDatosService.getStock()
    .subscribe(result => {
      // this.stock = result; // TODO: update desde back-end
      this.loading = false;
    });

    this.stock = [ // TODO: comentar
      { id: 1, productoId: 1, productoNombre: 'Jeans Dama', localId: 1, localNombre: 'Local CABA', cantidad: 15 },
      { id: 4, productoId: 2, productoNombre: 'Jeans Caballero', localId: 1, localNombre: 'Local CABA', cantidad: 12 },
      { id: 7, productoId: 3, productoNombre: 'Camisa Dama', localId: 1, localNombre: 'Local CABA', cantidad: 16 }
    ];

    this.filter();
    this.stockForm.controls.motivo.setValue(0);
  }

  select(stock: IStock) {
    this.seleccionado = stock;
    // console.log(this.seleccionado);
  }

  unselect() {
    this.seleccionado = new Stock();
    this.stockForm.controls.cantidad.setValue('');
    this.stockForm.controls.motivo.setValue(0);
    this.validaciones = '';
  }

  filter() {
    this.filteredStock = this.stock.filter(x => x.productoNombre.includes(this.filtroProducto));
  }

  delete() {

    if (this.formValidation() === false) { return; }
    if (confirm('Está seguro que desea generar la baja?') === false ) { return; }

    const bajaStock = new BajaStock();
    bajaStock.id = this.seleccionado.id;
    bajaStock.cantidad = this.stockForm.controls.cantidad.value;
    bajaStock.motivo = this.stockForm.controls.motivo.value;

    this.loading = true;
    // console.log(bajaStock);

    this.accesoDatosService.postBajaStock(bajaStock)
      .subscribe(result => { this.loading = false; });

    this.seleccionado.cantidad -= bajaStock.cantidad;
    this.unselect();
  }

  formValidation(): boolean {

    this.validaciones = '';

    if (this.seleccionado.id === 0) {
      this.validaciones += 'Falta elegir el producto a modificar.\n';
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

    // console.log(this.stockForm.controls.motivo.value);
    if (this.stockForm.controls.motivo.value === '' || this.stockForm.controls.motivo.value === 0) {
      this.validaciones += 'Falta elegir el motivo de la baja.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
