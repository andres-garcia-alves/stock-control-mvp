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

  loading: boolean;
  validaciones: string;

  locales: ILocal[] = [];
  seleccionado: ILocal = new Local();

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    this.accesoDatosService.getLocales()
      .subscribe(response => {
        this.loading = false;
        this.locales = response;
    });

    /*this.locales = [
      { id: 1, nombre: 'Local CABA' },
      { id: 2, nombre: 'Local Bs As' },
      { id: 3, nombre: 'Local Rosario' }
    ];*/
  }

  select(local: ILocal) {
    this.seleccionado = local;
  }

  unselect() {
    this.seleccionado = new Local();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('new');
      const aux: ILocal = this.seleccionado;
      this.locales.push(this.seleccionado);

      this.accesoDatosService.postLocal(this.seleccionado)
        .subscribe(response => {
          console.log(response);
          // aux.id = response; // TODO: update desde back-end
          aux.id = Math.max.apply(Math, this.locales.map(x => x.id)) + 1; // TODO: comentar
          this.loading = false;
      });

    } else { // update

      console.log('update');
      // console.log(this.seleccionado);
      this.accesoDatosService.putLocal(this.seleccionado)
        .subscribe(response => {
          console.log(response);
          this.loading = false;
        });
    }

    // console.log(this.locales);
    this.seleccionado = new Local();
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?')) {
      this.loading = true;
      const id = this.seleccionado.id;

      this.accesoDatosService.deleteLocal(id)
        .subscribe(response => {
          console.log(response);
          this.loading = false;
        });

      this.locales = this.locales.filter(x => x !== this.seleccionado);
      this.seleccionado = new Local();
    }
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
