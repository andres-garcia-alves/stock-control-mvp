import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProducto } from 'src/app/interfaces';
import { Producto } from 'src/app/entidades';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-maestro-productos',
  templateUrl: './maestro-productos.component.html',
  styleUrls: ['./maestro-productos.component.css']
})
export class MaestroProductosComponent implements OnInit {

  debug: any;
  loading: boolean;
  validaciones: string;

  productos: IProducto[] = [];
  seleccionado: IProducto = new Producto();
  seleccionadoBackup: IProducto = new Producto();

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.loading = true;

    this.productosService.getProductos()
    .subscribe(response => {
      console.log('getProductos()', response);
      this.productos = response;
      this.loading = false;
    });
  }

  select(producto: IProducto) {
    this.seleccionado = producto;
    this.seleccionadoBackup = new Producto(producto);
  }

  unselect() {
    this.seleccionado = new Producto();
    this.validaciones = '';
  }

  cancel() {
    const index = this.productos.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.productos[index] = this.seleccionadoBackup;
    this.unselect();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('CREATE', this.seleccionado);
      this.productosService.postProducto(this.seleccionado)
      .subscribe(response => {
        console.log('postProducto()', response);
        this.seleccionado.id = response.id; // Math.max.apply(Math, this.productos.map(x => x.id)) + 1;
        this.productos.push(this.seleccionado);
        this.unselect();
        this.loading = false;
      }, error => {
        this.validaciones = error;
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE', this.seleccionado);
      this.productosService.putProducto(this.seleccionado)
      .subscribe(response => {
        console.log('putProducto()', response);
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
    this.productosService.deleteProducto(this.seleccionado.id)
    .subscribe(response => {
      console.log('deleteProducto()', response);
      this.productos = this.productos.filter(x => x !== this.seleccionado);
      this.unselect();
      this.loading = false;
    }, error => {
      this.validaciones = error;
      this.loading = false;
    });
  }

  formValidations(): boolean {

    this.validaciones = '';

    if (this.seleccionado.nombre === '') {
      this.validaciones += 'Falta completar el nombre.\n';
    }

    if (this.seleccionado.descripcion === '') {
      this.validaciones += 'Falta completar la descripción.\n';
    }

    if (this.seleccionado.precio <= 0) {
      this.validaciones += 'Falta completar el precio.\n';
    }

    if (this.seleccionado.precio > 999999) {
      this.validaciones += 'Precio inválido. Máximo $999999.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
