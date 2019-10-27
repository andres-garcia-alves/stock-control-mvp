import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProveedor } from 'src/app/interfaces';
import { Proveedor } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-maestro-proveedores',
  templateUrl: './maestro-proveedores.component.html',
  styleUrls: ['./maestro-proveedores.component.css']
})
export class MaestroProveedoresComponent implements OnInit {

  debug: any;
  loading: boolean;
  validaciones: string;

  proveedores: IProveedor[] = [];
  seleccionado: IProveedor = new Proveedor();
  seleccionadoBackup: IProveedor = new Proveedor();

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    /*this.proveedores = [
      { id: 1, direccion: '', nombre: 'Levis', numero_telefono: '' },
      { id: 2, direccion: '', nombre: 'Wrangler', numero_telefono: '' },
      { id: 3, direccion: '', nombre: '42 Street', numero_telefono: '' },
      { id: 4, direccion: '', nombre: 'Chocolate', numero_telefono: '' },
      { id: 5, direccion: '', nombre: 'Akiabara', numero_telefono: '' },
      { id: 6, direccion: '', nombre: 'Solido', numero_telefono: '' }
    ];*/

    this.accesoDatosService.getProveedores()
    .subscribe(response => {
      console.log('getProveedores()', response);
      this.proveedores = response;
      this.loading = false;
    });
  }

  select(proveedor: IProveedor) {
    this.seleccionado = proveedor;
    this.seleccionadoBackup = new Proveedor(proveedor);
  }

  unselect() {
    const index = this.proveedores.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.proveedores[index] = this.seleccionadoBackup;
    this.seleccionado = new Proveedor();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('CREATE', this.seleccionado);
      this.accesoDatosService.postProveedor(this.seleccionado)
      .subscribe(response => {
        console.log('postProveedor()', response);
        this.seleccionado.id = response.id; // Math.max.apply(Math, this.proveedores.map(x => x.id)) + 1;
        this.proveedores.push(this.seleccionado);
        this.seleccionado = new Proveedor();
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE', this.seleccionado);
      this.accesoDatosService.putProveedor(this.seleccionado)
      .subscribe(response => {
        console.log('putProveedor()', response);
        this.loading = false;
      });
    }
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }
    this.loading = true;

    console.log('DELETE', this.seleccionado);
    this.accesoDatosService.deleteProveedor(this.seleccionado.id)
    .subscribe(response => {
      console.log('deleteProveedor()', response);
      this.loading = false;
    });

    this.proveedores = this.proveedores.filter(x => x !== this.seleccionado);
    this.seleccionado = new Proveedor();
  }

  formValidations(): boolean {

    this.validaciones = '';

    if (this.seleccionado.nombre === '') {
      this.validaciones += 'Falta completar el nombre.\n';
    }

    if (this.seleccionado.nombre.length > 30) {
      this.validaciones += 'La longitud máxima del texto es 30 carácteres.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
