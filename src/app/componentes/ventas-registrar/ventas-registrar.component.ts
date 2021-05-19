import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProducto } from 'src/app/interfaces';
import { Venta } from 'src/app/entidades';
import { ProductosService } from 'src/app/services/productos.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas-registrar',
  templateUrl: './ventas-registrar.component.html',
  styleUrls: ['./ventas-registrar.component.css']
})
export class VentasRegistrarComponent implements OnInit {

  debug: any;
  loading: boolean;
  validaciones: string;

  productos: IProducto[] = [];

  ventaForm: FormGroup;

  constructor(private productosService: ProductosService, private ventasService: VentasService) { }

  ngOnInit() {

    this.loading = true;

    this.ventaForm = new FormGroup({
      selectProductos: new FormControl(''),
      inputCantidad: new FormControl('')
    });

    this.productosService.getProductos()
    .subscribe(response => {
      console.log('getProductos()', response);
      this.productos = response;
      this.unselect();
      this.loading = false;
    });
  }

  unselect() {
    this.ventaForm.controls.selectProductos.setValue(0);
    this.ventaForm.controls.inputCantidad.setValue('');
    this.validaciones = '';
  }

  add() {

    if (this.formValidation() === false) { return; }
    this.loading = true;

    const venta = new Venta();
    venta.usuario = 11;
    venta.producto = this.ventaForm.controls.selectProductos.value;
    venta.cantidad = this.ventaForm.controls.inputCantidad.value;
    venta.fecha = Date.now();

    console.log('CREATE', venta);
    this.ventasService.postVenta(venta)
    .subscribe(response => {
      console.log('postVenta()', response);
      this.unselect();
      this.validaciones = 'Venta registarda satisfactoriamente.';
      this.loading = false;
    }, error => {
      this.validaciones = error;
      this.loading = false;
    });
  }

  formValidation(): boolean {

    this.validaciones = '';

    if (this.ventaForm.controls.selectProductos.value === '' ||  this.ventaForm.controls.selectProductos.value === 0) {
      this.validaciones += 'Falta elegir el producto.\n';
    }

    if (this.ventaForm.controls.inputCantidad.value <= 0) {
      this.validaciones += 'Falta completar la cantidad.\n';
    }
    if (this.ventaForm.controls.inputCantidad.value > 9999) {
      this.validaciones += 'Cantidad inválida. Máximo $9999.\n';
    }
    if (this.ventaForm.controls.inputCantidad.value % 1 !== 0) {
      this.validaciones += 'Cantidad inválida. Ingrese un número entero.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
