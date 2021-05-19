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
  messages: string;

  productos: IProducto[] = [];
  seleccionado: IProducto = new Producto();
  seleccionadoBackup: IProducto = new Producto();

  constructor(private productosService: ProductosService) { }

  async ngOnInit() {
    this.loading = true;

    try {
      const response = await this.productosService.getProductos()
      console.log('getProductos()', response);

      this.productos = response;
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  select(producto: IProducto) {
    this.seleccionado = producto;
    this.seleccionadoBackup = new Producto(producto);
  }

  unselect() {
    this.seleccionado = new Producto();
    this.messages = '';
  }

  cancel() {
    const index = this.productos.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.productos[index] = this.seleccionadoBackup;
    this.unselect();
  }

  async addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo
      console.log('CREATE', this.seleccionado);

      try {
        const response = await this.productosService.postProducto(this.seleccionado)
        console.log('postProducto()', response);

        this.seleccionado.id = response.id; // Math.max.apply(Math, this.productos.map(x => x.id)) + 1;
        this.productos.push(this.seleccionado);
        this.unselect();
      }
      catch (error) { this.messages = error; }
      finally { this.loading = false; }

    } else { // update
      console.log('UPDATE', this.seleccionado);

      try {
        const response = await this.productosService.putProducto(this.seleccionado)
        console.log('putProducto()', response);

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
      const response = await this.productosService.deleteProducto(this.seleccionado.id)
      console.log('deleteProducto()', response);

      this.productos = this.productos.filter(x => x !== this.seleccionado);
      this.unselect();
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  formValidations(): boolean {

    this.messages = '';

    if (this.seleccionado.nombre === '') {
      this.messages += 'Falta completar el nombre.\n';
    }
    if (this.seleccionado.descripcion === '') {
      this.messages += 'Falta completar la descripción.\n';
    }
    if (this.seleccionado.precio <= 0) {
      this.messages += 'Falta completar el precio.\n';
    }
    if (this.seleccionado.precio > 999999) {
      this.messages += 'Precio inválido. Máximo $999999.\n';
    }

    return (this.messages === '') ? true : false;
  }
}
