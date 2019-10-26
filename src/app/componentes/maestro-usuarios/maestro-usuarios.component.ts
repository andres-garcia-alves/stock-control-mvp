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

  loading: boolean;
  validaciones: string;

  usuarios: IUsuario[];
  seleccionado: IUsuario = new Usuario();
  seleccionadoBackup: IUsuario = new Usuario();

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    this.usuarios = [ // TODO: comentar
      { id: 1, nombre: 'Bonomini, Guido' },
      { id: 2, nombre: 'Debole, Nancy' },
      { id: 3, nombre: 'Garcia Alves, Andrés' },
      { id: 4, nombre: 'Salvarrey, Ignacio' },
      { id: 5, nombre: 'Tanaro, Maria' },
      { id: 6, nombre: 'Turreiro Manzini, Ignacio' }
    ];

    this.accesoDatosService.getUsuarios()
    .subscribe(response => {
      console.log('getUsuarios()', response);
      // this.usuarios = result; // TODO: update desde back-end
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
      const aux: IUsuario = this.seleccionado;

      this.accesoDatosService.postUsuario(this.seleccionado)
      .subscribe(response => {
        console.log('postUsuario()', response);
        // aux.id = response; // TODO: update desde back-end
        aux.id = Math.max.apply(Math, this.usuarios.map(x => x.id)) + 1; // TODO: comentar
        this.usuarios.push(this.seleccionado);
        this.loading = false;
      });

    } else { // update

      console.log('UPDATE');

      this.accesoDatosService.putUsuario(this.seleccionado)
      .subscribe(response => {
        console.log('putUsuario()', response);
        console.log(response);
        this.loading = false;
      });
    }

    // console.log(this.usuarios);
    this.seleccionado = new Usuario();
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }
    this.loading = true;

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

    if (this.seleccionado.nombre === '') {
      this.validaciones += 'Falta completar el nombre.\n';
    }

    if (this.seleccionado.nombre.length > 30) {
      this.validaciones += 'La longitud máxima del texto es 30 carácteres.\n';
    }

    return (this.validaciones === '') ? true : false;
  }
}
