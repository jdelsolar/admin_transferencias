import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferenciasComponent } from './pages/transferencias/transferencias.component';
import { ParametrosComponent } from './pages/parametros/parametros.component';
import { VerTransferenciaComponent } from './pages/transferencias/ver-transferencia/ver-transferencia.component';
import { SubirArchivoComponent } from './shared/subir-archivo/subir-archivo.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { FormularioComponent } from './pages/cuentas/formulario/formulario.component';
import { ListaComponent } from './pages/cuentas/lista/lista.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { AgregarComponent } from './pages/compras/modals/agregar/agregar.component';
import { TransferenciaComponent } from './pages/compras/modals/transferencia/transferencia.component';
import { MontoPipe } from './pipes/monto.pipe';
import { TasaPipe } from './pipes/tasa.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    TransferenciasComponent,
    ParametrosComponent,
    VerTransferenciaComponent,
    SubirArchivoComponent,
    CuentasComponent,
    FormularioComponent,
    ListaComponent,
    ReporteComponent,
    ComprasComponent,
    AgregarComponent,
    TransferenciaComponent,
    MontoPipe,
    TasaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  providers: [],
  entryComponents: [
    AgregarComponent,
    TransferenciaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
