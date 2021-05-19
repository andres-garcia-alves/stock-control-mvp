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
  messages: string;

  usuarios: IUsuario[];
  seleccionado: IUsuario = new Usuario();
  seleccionadoBackup: IUsuario = new Usuario();

  constructor(private usuariosService: UsuariosService) { }

  async ngOnInit() {
    this.loading = true;
    
    try {
      const response = await this.usuariosService.getUsuarios()
      console.log('getUsuarios()', response);

      this.usuarios = response;
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  select(usuario: IUsuario) {
    this.seleccionado = usuario;
    this.seleccionadoBackup = new Usuario(usuario);
  }

  unselect() {
    this.seleccionado = new Usuario();
    this.messages = '';
  }

  cancel() {
    const index = this.usuarios.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.usuarios[index] = this.seleccionadoBackup;
    this.unselect();
  }

  async addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo
      console.log('CREATE', this.seleccionado);
      // this.seleccionado.date_joined = new Date();
      // this.seleccionado.last_login = new Date();

      try {
        const response = await this.usuariosService.postUsuario(this.seleccionado)
        console.log('postUsuario()', response);
  
        this.seleccionado.id = response.id;
        this.usuarios.push(this.seleccionado);
        this.unselect();
      }
      catch (error) { this.messages = error; }
      finally { this.loading = false; }

    } else { // update
      console.log('UPDATE', this.seleccionado);

      try {
        const response = await this.usuariosService.putUsuario(this.seleccionado)
        console.log('putUsuario()', response);
  
        this.unselect();
      }
      catch (error) { this.messages = error; }
      finally { this.loading = false; }
    }
  }

  async delete() {

    if (this.deleteValidations() === false) { return; }
    if (confirm('Está seguro que desea borrarlo?') === false) { return; }
    
    this.loading = true;
    console.log('DELETE', this.seleccionado);

    try {
      const response = await this.usuariosService.deleteUsuario(this.seleccionado.id)
      console.log('deleteUsuario()', response);

      this.unselect();
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  formValidations(): boolean {
    this.messages = '';

    if (this.seleccionado.id === 11 || this.seleccionado.username.toLowerCase() === 'admin') {
      this.messages += 'El usuario ADMIN es de solo lectura.\n';
    }
    if (this.seleccionado.username === '') {
      this.messages += 'Falta completar el nombre de usuario.\n';
    }
    if (this.seleccionado.first_name === '') {
      this.messages += 'Falta completar el nombre de pila.\n';
    }
    if (this.seleccionado.last_name === '') {
      this.messages += 'Falta completar el apellido.\n';
    }
    const emailRegex = /^[-_\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(this.seleccionado.email) === false) {
      this.messages += 'El email es inválido.\n';
    }

    return (this.messages === '') ? true : false;
  }

  deleteValidations(): boolean {
    this.messages = '';

    if (this.seleccionado.username.toLowerCase() === 'admin') {
      this.messages += 'Ni se te ocurra eliminar el ADMIN que te quedás OUT !!\nLoko, que gente jodida ;-)\n';
    }

    return (this.messages === '') ? true : false;
  }
}
