import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVenta, IPlainVenta, IProducto, IUsuario } from 'src/app/interfaces';
import { PlainVenta } from 'src/app/entidades';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas-visualizar',
  templateUrl: './ventas-visualizar.component.html',
  styleUrls: ['./ventas-visualizar.component.css']
})
export class VentasVisualizarComponent implements OnInit {

  debug: any;
  loading: boolean;
  validaciones: string;

  productos: IProducto[] = [];
  ventas: IVenta[] = [];
  usuarios: IUsuario[] = [];
  plainVentas: IPlainVenta[] = [];

  seleccionado: IPlainVenta = new PlainVenta();

  filtroFecha: string;
  filtroProducto: string;
  filtroUsuario: string;
  filteredVentas: IPlainVenta[];

  ventaForm: FormGroup;

  constructor(private productosService: ProductosService, private usuariosService: UsuariosService,
              private ventasService: VentasService) { }

  ngOnInit() {

    this.loading = true;

    this.filtroFecha = '';
    this.filtroProducto = '';
    this.filtroUsuario = '';

    this.ventaForm = new FormGroup({
      selectProductos: new FormControl(''),
      inputCantidad: new FormControl('')
    });

    this.productosService.getProductos()
    .subscribe(response => {
      console.log('getProductos()', response);
      this.productos = response;

      this.usuariosService.getUsuarios()
      .subscribe(response2 => {
        console.log('getUsuarios()', response2);
        this.usuarios = response2;

        this.ventasService.getVentas()
        .subscribe(response3 => {
          console.log('getVentas()', response3);
          this.ventas = response3;
          this.buildPlainVentasFromResponse(response3);
          this.filter();
          this.loading = false;
        });
      });
    });
  }

  buildPlainVentasFromResponse(response: IVenta[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < response.length; i++) {
      const aux = new PlainVenta();
      aux.id = i + 1;
      aux.fecha = response[i].fecha;
      aux.productoId = response[i].producto;
      aux.productoNombre = this.productos.find(x => x.id === response[i].producto).nombre;
      aux.usuarioId = response[i].usuario;
      const usuario = this.usuarios.find(x => x.id === response[i].usuario);
      aux.usuarioNombre = usuario.last_name + ', ' + usuario.first_name;
      aux.cantidad = response[i].cantidad;

      this.plainVentas.push(aux);
      console.log('aux', aux);
    }
  }

  select(plainVenta: IPlainVenta) {
    this.seleccionado = plainVenta;
  }

  filter() {
    this.filteredVentas = this.plainVentas.filter(x =>
      x.productoNombre.includes(this.filtroProducto) && x.usuarioNombre.includes(this.filtroUsuario));

    const selectedDate = new Date(this.filtroFecha);
    selectedDate.setHours(selectedDate.getHours() + 3);

    if (this.filtroFecha !== undefined && this.filtroFecha !== null && this.filtroFecha !== '') {
      this.filteredVentas = this.filteredVentas.filter(x => new Date(x.fecha).toDateString() === selectedDate.toDateString());
    }

    this.filteredVentas = this.filteredVentas.sort(x => x.id);
    this.filteredVentas = this.filteredVentas.slice(0, 20);
  }
}
