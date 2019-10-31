import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateRouteGuard } from './guards/can-activate-route.guard';

import { LoginComponent } from './componentes/index';
import { HomeComponent } from './componentes/index';

import { VentasRegistrarComponent } from './componentes/index';
import { VentasRevertirComponent } from './componentes/index';
import { VentasReservaComponent } from './componentes/index';
import { VentasVisualizarComponent } from './componentes/index';

import { StockActualizarComponent } from './componentes/index';
import { StockBajaComponent } from './componentes/index';
import { StockAlertasComponent } from './componentes/index';
import { StockTransferirComponent } from './componentes/index';

import { MaestroLocalesComponent } from './componentes/index';
import { MaestroProductosComponent } from './componentes/index';
import { MaestroProveedoresComponent } from './componentes/index';
import { MaestroUsuariosComponent } from './componentes/index';

import { ReporteProductosSinVentaComponent } from './componentes/index';
import { ReportePromocionesComponent } from './componentes/index';
import { ReporteVendedoresPorMontoComponent } from './componentes/index';
import { ReporteVendedoresPorUnidComponent } from './componentes/index';

import { AboutComponent } from './componentes/index';
import { ChangePasswordComponent } from './componentes/index';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'venta-resgistrar', component: VentasRegistrarComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'venta-revertir', component: VentasRevertirComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'venta-visualizar', component: VentasVisualizarComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'venta-reserva', component: VentasReservaComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'stock-actualizar', component: StockActualizarComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'stock-baja-defectuoso', component: StockBajaComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'stock-alerta-repo', component: StockAlertasComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'stock-transferir', component: StockTransferirComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'maestro-locales', component: MaestroLocalesComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'maestro-productos', component: MaestroProductosComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'maestro-proveedores', component: MaestroProveedoresComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'maestro-usuarios', component: MaestroUsuariosComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'reporte-productos-sin-venta', component: ReporteProductosSinVentaComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'reporte-promociones', component: ReportePromocionesComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'reporte-vendedores-por-monto', component: ReporteVendedoresPorMontoComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'reporte-vendedores-por-unid', component: ReporteVendedoresPorUnidComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [CanActivateRouteGuard]},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
