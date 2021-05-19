import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogin } from 'src/app/interfaces';
import { Login } from 'src/app/entidades';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  debug: any;
  loading: boolean;
  validaciones: string;

  registroForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    contraseña: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)])
  });

  ngOnInit() { }

  onSubmit() {

    this.validaciones = null;
    this.loading = true;

    const login = new Login();
    login.username = this.registroForm.value.usuario.toLowerCase();
    login.password = this.registroForm.value.contraseña.toLowerCase();
    console.log('Login:', login);

    this.loginService.postLogin(login)
    .subscribe(response => {

      console.log('postLogin()', response);
      if (response === null || response === '') { return; }
      // "Token ba897b501056c54bd59ee829ab28a7bc6ff81abc"
      // if (login.username.toLowerCase() !== 'admin' || login.password.toLowerCase() !== '1234') { return; }

      // tslint:disable-next-line:no-string-literal
      sessionStorage.setItem('token', response['token']);
      sessionStorage.setItem('username', login.username);
      this.router.navigate(['/home']);

    }, error => {
      this.validaciones = 'Usuario y/o contraseña incorrectos.';
      this.loading = false;
    });
  }
}
