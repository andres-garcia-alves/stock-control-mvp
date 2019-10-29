import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsuario } from 'src/app/interfaces';
import { Usuario } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-maestro-usuarios',
  templateUrl: './maestro-usuarios.component.html',
  styleUrls: ['./maestro-usuarios.component.css']
})
export class MaestroUsuariosComponent implements OnInit {

  debug: any;
  loading: boolean;
  validaciones: string;

  usuarios: IUsuario[];
  seleccionado: IUsuario = new Usuario();
  seleccionadoBackup: IUsuario = new Usuario();

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    /*this.usuarios = [
      { id: 1, username: 'Bonomini, Guido', first_name: 'Guido', last_name: 'Bonomini', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
      { id: 2, username: 'Debole, Nancy', first_name: 'Nancy', last_name: 'Debole', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
      { id: 3, username: 'Garcia Alves, Andrés', first_name: 'Andrés', last_name: 'Garcia Alves', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
      { id: 4, username: 'Salvarrey, Ignacio', first_name: 'Ignacio', last_name: 'Salvarrey', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
      { id: 5, username: 'Tanaro, Maria', first_name: 'Maria', last_name: 'Tanaro', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
      { id: 6, username: 'Turreiro Manzini, Ignacio', first_name: 'Ignacio', last_name: 'Turreiro Manzini', email: 'abc@gmail.com',
      is_active: true, date_joined: Date.now(), last_login: Date.now() },
    ];*/

    this.accesoDatosService.getUsuarios()
    .subscribe(response => {
      console.log('getUsuarios()', response);
      this.usuarios = response;
      this.loading = false;
    });
  }

  select(usuario: IUsuario) {
    this.seleccionado = usuario;
    this.seleccionadoBackup = new Usuario(usuario);
  }

  unselect() {
    const index = this.usuarios.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.usuarios[index] = this.seleccionadoBackup;
    this.seleccionado = new Usuario();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('CREATE', this.seleccionado);
      this.accesoDatosService.postUsuario(this.seleccionado)
      .subscribe(response => {
        console.log('postUsuario()', response);
        this.seleccionado.id = response.id; // Math.max.apply(Math, this.usuarios.map(x => x.id)) + 1;
        this.usuarios.push(this.seleccionado);
        this.seleccionado = new Usuario();
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE', this.seleccionado);
      this.accesoDatosService.putUsuario(this.seleccionado)
      .subscribe(response => {
        console.log('putUsuario()', response);
        console.log(response);
        this.loading = false;
      });
    }
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }
    this.loading = true;

    console.log('DELETE', this.seleccionado);
    this.accesoDatosService.deleteUsuario(this.seleccionado.id)
    .subscribe(response => {
      console.log('deleteUsuario()', response);
      this.loading = false;
    });

    this.usuarios = this.usuarios.filter(x => x !== this.seleccionado);
    this.seleccionado = new Usuario();
  }

  formValidations(): boolean {

    this.validaciones = '';

    if (this.seleccionado.username === '') {
      this.validaciones += 'Falta completar el nombre.\n';
    }

    if (this.seleccionado.username === '') {
      this.validaciones += 'Falta completar el nombre.\n';
    }

    if (this.seleccionado.username === '') {
      this.validaciones += 'Falta completar el nombre.\n';
    }

    if (this.seleccionado.username === '') {
      this.validaciones += 'Falta completar el nombre.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
