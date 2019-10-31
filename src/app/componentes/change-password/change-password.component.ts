import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogin } from 'src/app/interfaces';
import { Login } from 'src/app/entidades';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private accesoDatosService: AccesoDatosService) { }

  debug: any;
  loading: boolean;
  validaciones: string;

  registroForm = new FormGroup({
    nuevaContraseña: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    repetirContraseña: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)])
  });

  ngOnInit() {
    this.validaciones = 'Mínimo 4 caracteres.';
  }

  onSubmit() {

    if (this.registroForm.value.nuevaContraseña !== this.registroForm.value.repetirContraseña) {
      this.validaciones = 'Las contraseñas no coinciden.';
      return;
    }

    this.validaciones = 'Pendiente de desarrollo (fuera del MVP).';
    return;

    /*const login = new Login();
    login.username = (sessionStorage.getItem('username') != null) ? sessionStorage.getItem('username') : '';
    login.password = this.registroForm.value.nuevaContraseña;

    this.accesoDatosService.putLogin(login)
    .subscribe(response => {
      console.log('putLogin()', response);
      this.validaciones = 'Contraseña modificada exitosamente.';
    }, error => {
      this.validaciones = error;
      this.loading = false;
    });*/
  }
}
