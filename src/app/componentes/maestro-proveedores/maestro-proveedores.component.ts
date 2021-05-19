import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProveedor } from 'src/app/interfaces';
import { Proveedor } from 'src/app/entidades';
import { ProveedoresService } from 'src/app/services/proveedores.service';

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

  constructor(private proveedoresService: ProveedoresService) { }

  ngOnInit() {
    this.loading = true;

    this.proveedoresService.getProveedores()
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
    this.seleccionado = new Proveedor();
    this.validaciones = '';
  }

  cancel() {
    const index = this.proveedores.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.proveedores[index] = this.seleccionadoBackup;
    this.unselect();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('CREATE', this.seleccionado);
      this.proveedoresService.postProveedor(this.seleccionado)
      .subscribe(response => {
        console.log('postProveedor()', response);
        this.seleccionado.id = response.id; // Math.max.apply(Math, this.proveedores.map(x => x.id)) + 1;
        this.proveedores.push(this.seleccionado);
        this.unselect();
        this.loading = false;
      }, error => {
        this.validaciones = error;
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE', this.seleccionado);
      this.proveedoresService.putProveedor(this.seleccionado)
      .subscribe(response => {
        console.log('putProveedor()', response);
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
    this.proveedoresService.deleteProveedor(this.seleccionado.id)
    .subscribe(response => {
      console.log('deleteProveedor()', response);
      this.proveedores = this.proveedores.filter(x => x !== this.seleccionado);
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

    if (this.seleccionado.direccion === '') {
      this.validaciones += 'Falta completar la dirección.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
