import { IUsuario } from 'src/app/interfaces';

export class Usuario implements IUsuario {
    id = 0;
    nombre = '';

    constructor(usuario?: IUsuario) {
        if (usuario) {
            this.id = usuario.id;
            this.nombre = usuario.nombre;
        }
    }
}
