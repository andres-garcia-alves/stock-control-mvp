import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILocal } from 'src/app/interfaces';
import { Local } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-maestro-locales',
  templateUrl: './maestro-locales.component.html',
  styleUrls: ['./maestro-locales.component.css']
})
export class MaestroLocalesComponent implements OnInit {

  debug: any;
  loading: boolean;
  validaciones: string;

  locales: ILocal[] = [];
  seleccionado: ILocal = new Local();
  seleccionadoBackup: ILocal = new Local();

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    /*this.locales = [
      { id: 1, direccion: '', nombre: 'Local CABA', numero_telefono: '', sucursula_id: 0 },
      { id: 2, direccion: '', nombre: 'Local Bs As', numero_telefono: '', sucursula_id: 0 },
      { id: 3, direccion: '', nombre: 'Local Rosario', numero_telefono: '', sucursula_id: 0 }
    ];*/

    this.accesoDatosService.getLocales()
    .subscribe(response => {
      console.log('getLocales()', response);
      this.locales = response;
      this.loading = false;
    });
  }

  select(local: ILocal) {
    this.seleccionado = local;
    this.seleccionadoBackup = new Local(local);
  }

  unselect() {
    const index = this.locales.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.locales[index] = this.seleccionadoBackup;
    this.seleccionado = new Local();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('CREATE', this.seleccionado);
      this.accesoDatosService.postLocal(this.seleccionado)
      .subscribe(response => {
        console.log('postLocal()', response);
        this.seleccionado.id = response.id; // Math.max.apply(Math, this.locales.map(x => x.id)) + 1;
        this.locales.push(this.seleccionado);
        this.seleccionado = new Local();
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE', this.seleccionado);
      this.accesoDatosService.putLocal(this.seleccionado)
      .subscribe(response => {
        console.log('putLocal()', response);
        this.loading = false;
      });
    }
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }
    this.loading = true;

    console.log('DELETE', this.seleccionado);
    this.accesoDatosService.deleteLocal(this.seleccionado.id)
    .subscribe(response => {
      console.log('deleteLocal()', response);
      this.loading = false;
    });

    this.locales = this.locales.filter(x => x !== this.seleccionado);
    this.seleccionado = new Local();
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
