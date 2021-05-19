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
  messages: string;

  productos: IProducto[] = [];

  ventaForm: FormGroup;

  constructor(private productosService: ProductosService, private ventasService: VentasService) { }

  async ngOnInit() {

    this.loading = true;

    this.ventaForm = new FormGroup({
      selectProductos: new FormControl(''),
      inputCantidad: new FormControl('')
    });

    try {
      const response = await this.productosService.getProductos()
      console.log('getProductos()', response);

      this.productos = response;
      this.unselect();
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  unselect() {
    this.ventaForm.controls.selectProductos.setValue(0);
    this.ventaForm.controls.inputCantidad.setValue('');
    this.messages = '';
  }

  async add() {

    if (this.formValidation() === false) { return; }

    const venta = new Venta();
    venta.usuario = 11;
    venta.producto = this.ventaForm.controls.selectProductos.value;
    venta.cantidad = this.ventaForm.controls.inputCantidad.value;
    venta.fecha = Date.now();

    this.loading = true;
    console.log('CREATE', venta);

    try {
      const response = await this.ventasService.postVenta(venta)
      console.log('postVenta()', response);

      this.unselect();
      this.messages = 'Venta registarda satisfactoriamente.';
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  formValidation(): boolean {
    this.messages = '';

    if (this.ventaForm.controls.selectProductos.value === '' ||  this.ventaForm.controls.selectProductos.value === 0) {
      this.messages += 'Falta elegir el producto.\n';
    }
    if (this.ventaForm.controls.inputCantidad.value <= 0) {
      this.messages += 'Falta completar la cantidad.\n';
    }
    if (this.ventaForm.controls.inputCantidad.value > 9999) {
      this.messages += 'Cantidad inválida. Máximo $9999.\n';
    }
    if (this.ventaForm.controls.inputCantidad.value % 1 !== 0) {
      this.messages += 'Cantidad inválida. Ingrese un número entero.\n';
    }

    return (this.messages === '') ? true : false;
  }
}
