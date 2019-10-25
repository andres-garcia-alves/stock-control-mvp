import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProducto } from 'src/app/interfaces';
import { Producto } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-maestro-productos',
  templateUrl: './maestro-productos.component.html',
  styleUrls: ['./maestro-productos.component.css']
})
export class MaestroProductosComponent implements OnInit {

  loading: boolean;
  validaciones: string;

  productos: IProducto[] = [];
  seleccionado: IProducto = new Producto();
  seleccionadoBackup: IProducto = new Producto();

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    this.accesoDatosService.getProductos()
      .subscribe(response => {
        this.loading = false;
        this.productos = response;
    });

    /*this.productos = [ // TODO: comentar
      { id: 1, nombre: 'Jeans Dama', precio: 3500 },
      { id: 2, nombre: 'Jeans Caballero', precio: 3600 },
      { id: 3, nombre: 'Camisa Dama', precio: 1700 },
      { id: 4, nombre: 'Camisa Caballero', precio: 1800 },
      { id: 5, nombre: 'Remera Dama', precio: 1000 },
      { id: 6, nombre: 'Remera Caballero', precio: 1200 }
    ];*/
  }

  select(producto: IProducto) {
    this.seleccionado = producto;
    this.seleccionadoBackup = new Producto(producto);
  }

  unselect() {
    const index = this.productos.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.productos[index] = this.seleccionadoBackup;
    this.seleccionado = new Producto();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('new');
      const aux: IProducto = this.seleccionado;

      this.accesoDatosService.postProducto(this.seleccionado)
        .subscribe(response => {
          this.productos.push(this.seleccionado);
          // aux.id = response; // // TODO: update desde back-end
          aux.id = Math.max.apply(Math, this.productos.map(x => x.id)) + 1; // TODO: comentar
          this.loading = false;
      });

    } else { // update

      console.log('update');
      this.accesoDatosService.putProducto(this.seleccionado)
        .subscribe(response => {
          console.log(response);
          this.loading = false;
        });
    }

    // console.log(this.productos);
    this.seleccionado = new Producto();
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }

    this.loading = true;
    const id = this.seleccionado.id;

    this.accesoDatosService.deleteProducto(id)
      .subscribe(response => {
        console.log(response);
        this.loading = false;
      });

    this.productos = this.productos.filter(x => x !== this.seleccionado);
    this.seleccionado = new Producto();
  }

  formValidations(): boolean {

    this.validaciones = '';

    if (this.seleccionado.nombre === '') {
      this.validaciones += 'Falta completar el nombre.\n';
    }

    if (this.seleccionado.nombre.length > 30) {
      this.validaciones += 'La longitud máxima del texto es 30 carácteres.\n';
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
