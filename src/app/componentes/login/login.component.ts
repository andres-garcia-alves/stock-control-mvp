import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogin } from 'src/app/interfaces';
import { AccesoDatosService } from 'src/app/services/acceso-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private accesoDatosService: AccesoDatosService) { }

  login: ILogin;
  mensaje: string = null;

  registroForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    contraseña: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)])
  });

  ngOnInit() { }

  onSubmit() {
    this.mensaje = null;

    this.login = {
      usuario: this.registroForm.value.usuario,
      password: this.registroForm.value.contraseña
    };

    // TODO: comentar esta sección
    if (this.login.usuario.toLowerCase() === 'admin' && this.login.password.toLowerCase() === '1234') {
      sessionStorage.setItem('user', this.login.usuario);
      sessionStorage.setItem('token', 'aqui-va-a-ir-el-token-de-autorizacion');
      this.router.navigate(['/home']);
    } else {
      this.mensaje = 'Usuario y/o contraseña incorrectos.';
    }

    /*this.accesoDatosService.postLogin(this.login)
      .subscribe(result => {
        console.log(result);
        if (result !== '' && result !== null) {
        sessionStorage.setItem('token', result); // TODO: descomentar
        }
    });*/
  }
}