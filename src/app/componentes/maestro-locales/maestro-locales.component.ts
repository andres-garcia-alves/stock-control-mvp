import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILocal } from 'src/app/interfaces';
import { Local } from 'src/app/entidades';
import { LocalesService } from 'src/app/services/locales.service';

@Component({
  selector: 'app-maestro-locales',
  templateUrl: './maestro-locales.component.html',
  styleUrls: ['./maestro-locales.component.css']
})
export class MaestroLocalesComponent implements OnInit {

  debug: any;
  loading: boolean;
  messages: string;

  locales: ILocal[] = [];
  seleccionado: ILocal = new Local();
  seleccionadoBackup: ILocal = new Local();

  constructor(private localesService: LocalesService) { }

  async ngOnInit() {
    this.loading = true;
    try {
      const response = await this.localesService.getLocales()  
      console.log('getLocales()', response);

      this.locales = response;
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  select(local: ILocal) {
    this.seleccionado = local;
    this.seleccionadoBackup = new Local(local);
  }

  unselect() {
    this.seleccionado = new Local();
    this.messages = '';
  }

  cancel() {
    const index = this.locales.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.locales[index] = this.seleccionadoBackup;
    this.unselect();
  }

  async addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo
      console.log('CREATE', this.seleccionado);

      try {
        const response = await this.localesService.postLocal(this.seleccionado)
        console.log('postLocal()', response);

        this.seleccionado.id = response.id; // Math.max.apply(Math, this.locales.map(x => x.id)) + 1;
        this.locales.push(this.seleccionado);
        this.unselect();
      }
      catch (error) { this.messages = error; }
      finally { this.loading = false; }
      
    } else { // update
      console.log('UPDATE', this.seleccionado);

      try {
        const response = await this.localesService.putLocal(this.seleccionado)
        console.log('putLocal()', response);

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
      const response = await this.localesService.deleteLocal(this.seleccionado.id)
      console.log('deleteLocal()', response);

      this.locales = this.locales.filter(x => x !== this.seleccionado);
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
    if (this.seleccionado.direccion === '') {
      this.messages += 'Falta completar la dirección.\n';
    }

    return (this.messages === '') ? true : false;
  }
}
