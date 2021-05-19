import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsuario } from 'src/app/interfaces';
import { Usuario } from 'src/app/entidades';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.loading = true;

    this.usuariosService.getUsuarios()
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
    this.seleccionado = new Usuario();
    this.validaciones = '';
  }

  cancel() {
    const index = this.usuarios.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.usuarios[index] = this.seleccionadoBackup;
    this.unselect();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo
      // this.seleccionado.date_joined = new Date();
      // this.seleccionado.last_login = new Date();

      console.log('CREATE', this.seleccionado);
      this.usuariosService.postUsuario(this.seleccionado)
      .subscribe(response => {
        console.log('postUsuario()', response);
        this.seleccionado.id = response.id;
        this.usuarios.push(this.seleccionado);
        this.unselect();
        this.loading = false;
      }, error => {
        this.validaciones = error;
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE', this.seleccionado);
      this.usuariosService.putUsuario(this.seleccionado)
      .subscribe(response => {
        console.log('putUsuario()', response);
        this.unselect();
        this.loading = false;
      }, error => {
        this.validaciones = error;
        this.loading = false;
      });
    }
  }

  delete() {

    if (this.deleteValidations() === false) { return; }
    if (confirm('Está seguro que desea borrarlo?') === false) { return; }
    this.loading = true;

    console.log('DELETE', this.seleccionado);
    this.usuariosService.deleteUsuario(this.seleccionado.id)
    .subscribe(response => {
      console.log('deleteUsuario()', response);
      this.usuarios = this.usuarios.filter(x => x !== this.seleccionado);
      this.unselect();
      this.loading = false;
    }, error => {
      this.validaciones = error;
      this.loading = false;
    });
  }

  formValidations(): boolean {

    this.validaciones = '';

    if (this.seleccionado.id === 11 || this.seleccionado.username.toLowerCase() === 'admin') {
      this.validaciones += 'El usuario ADMIN es de solo lectura.\n';
    }

    if (this.seleccionado.username === '') {
      this.validaciones += 'Falta completar el nombre de usuario.\n';
    }

    if (this.seleccionado.first_name === '') {
      this.validaciones += 'Falta completar el nombre de pila.\n';
    }

    if (this.seleccionado.last_name === '') {
      this.validaciones += 'Falta completar el apellido.\n';
    }

    const emailRegex = /^[-_\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(this.seleccionado.email) === false) {
      this.validaciones += 'El email es inválido.\n';
    }

    return (this.validaciones === '') ? true : false;
  }

  deleteValidations(): boolean {

    this.validaciones = '';

    if (this.seleccionado.username.toLowerCase() === 'admin') {
      this.validaciones += 'Ni se te ocurra eliminar el ADMIN que te quedás OUT !!\nLoko, que gente jodida ;-)\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
