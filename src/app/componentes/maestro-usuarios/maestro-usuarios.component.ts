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

  constructor(private accesoDatosService: AccesoDatosService) { }

  ngOnInit() {
    this.loading = true;

    /*this.accesoDatosService.getUsuarios()
      .subscribe(response => {
        // this.usuarios = result; // TODO: update desde back-end
        this.loading = false;
    });*/

    this.usuarios = [ // TODO: comentar
      { id: 1, nombre: 'Bonomini, Guido' },
      { id: 2, nombre: 'Debole, Nancy' },
      { id: 3, nombre: 'Garcia Alves, Andrés' },
      { id: 4, nombre: 'Salvarrey, Ignacio' },
      { id: 5, nombre: 'Tanaro, Maria' },
      { id: 6, nombre: 'Turreiro Manzini, Ignacio' }
    ];
  }

  select(usuario: IUsuario) {
    this.seleccionado = usuario;
  }

  unselect() {
    this.seleccionado = new Usuario();
  }

  addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo

      console.log('new');
      const aux: IUsuario = this.seleccionado;
      this.usuarios.push(this.seleccionado);

      this.accesoDatosService.postUsuario(this.seleccionado)
        .subscribe(response => {
          // aux.id = response; // TODO: update desde back-end
          aux.id = Math.max.apply(Math, this.usuarios.map(x => x.id)) + 1; // TODO: comentar
          this.loading = false;
      });

    } else { // update

      console.log('update');
      this.accesoDatosService.putUsuario(this.seleccionado)
        .subscribe(response => {
          console.log(response);
          this.loading = false;
        });
    }

    // console.log(this.usuarios);
    this.seleccionado = new Usuario();
  }

  delete() {

    if (confirm('Está seguro que desea borrarlo?')) {
      this.loading = true;
      const id = this.seleccionado.id;

      this.accesoDatosService.deleteUsuario(id)
        .subscribe(response => {
          console.log(response);
          this.loading = false;
        });

      this.usuarios = this.usuarios.filter(x => x !== this.seleccionado);
      this.seleccionado = new Usuario();
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
