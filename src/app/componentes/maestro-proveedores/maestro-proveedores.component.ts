import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProveedor } from 'src/app/interfaces';
import { Proveedor } from 'src/app/entidades';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-maestro-proveedores',
  templateUrl: './maestro-proveedores.component.html',
  styleUrls: ['./maestro-proveedores.component.css']
})
export class MaestroProveedoresComponent implements OnInit {

  debug: any;
  loading: boolean;
  messages: string;

  proveedores: IProveedor[] = [];
  seleccionado: IProveedor = new Proveedor();
  seleccionadoBackup: IProveedor = new Proveedor();

  constructor(private proveedoresService: ProveedoresService) { }

  async ngOnInit() {
    this.loading = true;

    try {
      const response = await this.proveedoresService.getProveedores()
      console.log('getProveedores()', response);

      this.proveedores = response;
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  select(proveedor: IProveedor) {
    this.seleccionado = proveedor;
    this.seleccionadoBackup = new Proveedor(proveedor);
  }

  unselect() {
    this.seleccionado = new Proveedor();
    this.messages = '';
  }

  cancel() {
    const index = this.proveedores.findIndex(x => x.id === this.seleccionadoBackup.id);
    this.proveedores[index] = this.seleccionadoBackup;
    this.unselect();
  }

  async addOrEdit() {

    if (this.formValidations() === false) { return; }
    this.loading = true;

    if (this.seleccionado.id === 0) { // nuevo
      console.log('CREATE', this.seleccionado);

      try {
        const response = await this.proveedoresService.postProveedor(this.seleccionado)
        console.log('postProveedor()', response);
  
        this.seleccionado.id = response.id; // Math.max.apply(Math, this.proveedores.map(x => x.id)) + 1;
        this.proveedores.push(this.seleccionado);
        this.unselect();
      }
      catch (error) { this.messages = error; }
      finally { this.loading = false; }

    } else { // update
      console.log('UPDATE', this.seleccionado);

      try {
        const response = await this.proveedoresService.putProveedor(this.seleccionado)
        console.log('putProveedor()', response);
  
        this.unselect();
      }
      catch (error) { this.messages = error; }
      finally { this.loading = false; }
    }
  }

  async delete() {

    if (confirm('Está seguro que desea borrarlo?') === false) { return; }

    this.loading = true;
    console.log('DELETE', this.seleccionado);

    try {
      const response = await this.proveedoresService.deleteProveedor(this.seleccionado.id)
      console.log('deleteProveedor()', response);

      this.proveedores = this.proveedores.filter(x => x !== this.seleccionado);
      this.unselect();
    }
    catch (error) { this.messages = error; }
    finally { this.loading = false; }
  }

  formValidations(): boolean {
    this.messages = '';

    if (this.seleccionado.nombre === '') {
      this.messages += 'Falta completar el nombre.\n';
    }
    if (this.seleccionado.direccion === '') {
      this.messages += 'Falta completar la dirección.\n';
    }

    return (this.messages === '') ? true : false;
  }
}
