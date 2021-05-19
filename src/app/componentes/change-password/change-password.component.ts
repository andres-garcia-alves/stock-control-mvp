import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogin } from 'src/app/interfaces';
import { Login } from 'src/app/entidades';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  debug: any;
  loading: boolean;
  messages: string;

  registroForm = new FormGroup({
    nuevaContraseña: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    repetirContraseña: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)])
  });

  ngOnInit() {
    this.messages = 'Mínimo 4 caracteres.';
  }

  async onSubmit() {

    if (this.registroForm.value.nuevaContraseña !== this.registroForm.value.repetirContraseña) {
      this.messages = 'Las contraseñas no coinciden.';
      return;
    }

    this.messages = 'Pendiente de desarrollo (fuera del MVP).';
    return;

    /*
    const login = new Login();
    login.username = (sessionStorage.getItem('username') != null) ? sessionStorage.getItem('username') : '';
    login.password = this.registroForm.value.nuevaContraseña;

    try {
      await this.loginService.putLogin(login)
      this.messages = 'Contraseña modificada exitosamente.';
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
    */
  }
}
