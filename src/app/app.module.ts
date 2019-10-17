import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CanActivateRouteGuard } from './guards/can-activate-route.guard';

import { LoginComponent } from './componentes/login/login.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { VentasRegistrarComponent } from './componentes/ventas-registrar/ventas-registrar.component';
import { VentasRevertirComponent } from './componentes/ventas-revertir/ventas-revertir.component';
import { VentasReservaComponent } from './componentes/ventas-reserva/ventas-reserva.component';
import { StockActualizarComponent } from './componentes/stock-actualizar/stock-actualizar.component';
import { StockBajaComponent } from './componentes/stock-baja/stock-baja.component';
import { StockAlertasComponent } from './componentes/stock-alertas/stock-alertas.component';
import { StockTransferirComponent } from './componentes/stock-transferir/stock-transferir.component';
import { MaestroLocalesComponent } from './componentes/maestro-locales/maestro-locales.component';
import { MaestroProductosComponent } from './componentes/maestro-productos/maestro-productos.component';
import { MaestroProveedoresComponent } from './componentes/maestro-proveedores/maestro-proveedores.component';
import { MaestroUsuariosComponent } from './componentes/maestro-usuarios/maestro-usuarios.component';
import { ReporteProductosSinVentaComponent } from './componentes/reporte-productos-sin-venta/reporte-productos-sin-venta.component';
import { ReportePromocionesComponent } from './componentes/reporte-promociones/reporte-promociones.component';
import { ReporteVendedoresPorMontoComponent } from './componentes/reporte-vendedores-por-monto/reporte-vendedores-por-monto.component';
import { ReporteVendedoresPorUnidComponent } from './componentes/reporte-vendedores-por-unid/reporte-vendedores-por-unid.component';
import { AboutComponent } from './componentes/about/about.component';
import { ChangePasswordComponent } from './componentes/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    VentasRegistrarComponent,
    VentasRevertirComponent,
    VentasReservaComponent,
    StockActualizarComponent,
    StockBajaComponent,
    StockAlertasComponent,
    StockTransferirComponent,
    MaestroLocalesComponent,
    MaestroProductosComponent,
    MaestroProveedoresComponent,
    MaestroUsuariosComponent,
    ReporteProductosSinVentaComponent,
    ReportePromocionesComponent,
    ReporteVendedoresPorMontoComponent,
    ReporteVendedoresPorUnidComponent,
    AboutComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppBootstrapModule
  ],
  providers: [CanActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
