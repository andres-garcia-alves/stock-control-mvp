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

    /*this.productos = [
      { id: 1, codigo_barra: '', nombre: 'Jeans Dama', descripcion: '', precio: 3500 },
      { id: 2, codigo_barra: '', nombre: 'Jeans Caballero', descripcion: '', precio: 3600 },
      { id: 3, codigo_barra: '', nombre: 'Camisa Dama', descripcion: '', precio: 1700 },
      { id: 4, codigo_barra: '', nombre: 'Camisa Caballero', descripcion: '', precio: 1800 },
      { id: 5, codigo_barra: '', nombre: 'Remera Dama', descripcion: '', precio: 1000 },
      { id: 6, codigo_barra: '', nombre: 'Remera Caballero', descripcion: '', precio: 1200 }
    ];*/

    this.accesoDatosService.getProductos()
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
    const index = this.productos.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.productos[index] = this.seleccionadoBackup;
    this.seleccionado = new Producto();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('CREATE', this.seleccionado);
      const aux: IProducto = this.seleccionado;

      this.accesoDatosService.postProducto(this.seleccionado)
      .subscribe(response => {
        console.log('postProducto()', response);
        // aux.id = response; // // TODO: update desde back-end
        aux.id = Math.max.apply(Math, this.productos.map(x => x.id)) + 1; // TODO: comentar
        this.productos.push(this.seleccionado);
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE');
      this.accesoDatosService.putProducto(this.seleccionado)
      .subscribe(response => {
        console.log('putProducto()', response);
        this.loading = false;
      });
    }

    // console.log(this.productos);
    this.seleccionado = new Producto();
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }
    this.loading = true;

    this.accesoDatosService.deleteProducto(this.seleccionado.id)
    .subscribe(response => {
      console.log('deleteProducto()', response);
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
