import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogin } from 'src/app/interfaces';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private accesoDatosService: AccesoDatosService) { }

  login: ILogin;
  mensaje = 'Mínimo 4 caracteres.';

  registroForm = new FormGroup({
    nuevaContraseña: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    repetirContraseña: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)])
  });

  ngOnInit() { }

  onSubmit() {
    if (this.registroForm.value.nuevaContraseña !== this.registroForm.value.repetirContraseña) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.login = {
      usuario: '', // this.registroForm.value.usuario,
      password: this.registroForm.value.nuevaContraseña
    };

    this.accesoDatosService.putLogin(this.login)
    .subscribe(response => {
      console.log('putLogin()', response);
      // TODO: update desde backend
      // if (result !== '' && result !== null) {
      // this.mensaje = 'Contraseña modificada exitosamente.';
    });
  }
}
