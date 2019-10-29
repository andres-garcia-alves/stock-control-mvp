import { IUsuario } from 'src/app/interfaces';

export class Usuario implements IUsuario {
    id = 0;
    username = '';
    // tslint:disable-next-line:variable-name
    first_name = '';
    // tslint:disable-next-line:variable-name
    last_name = '';
    email = '';
    // tslint:disable-next-line:variable-name
    is_active = true;
    // tslint:disable-next-line:variable-name
    // date_joined = new Date();
    // tslint:disable-next-line:variable-name
    // last_login = new Date();

    constructor(usuario?: IUsuario) {
        if (usuario) {
            this.id = usuario.id;
            this.username = usuario.username;
            this.first_name = usuario.first_name;
            this.last_name = usuario.last_name;
            this.email = usuario.email;
            this.is_active = usuario.is_active;
            // this.date_joined = usuario.date_joined;
            // this.last_login = usuario.last_login;
        }
    }
}
