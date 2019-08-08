import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { TransferenciasComponent } from "./pages/transferencias/transferencias.component";
import { ParametrosComponent } from "./pages/parametros/parametros.component";
import { CuentasComponent } from "./pages/cuentas/cuentas.component";
import { ReporteComponent } from "./pages/reporte/reporte.component";
import { ComprasComponent } from "./pages/compras/compras.component";
import { BoletasComponent } from "./pages/boletas/boletas.component";
import { RegistradosComponent } from "./pages/registrados/registrados.component";
import { BoletasIvaComponent } from "./pages/boletas-iva/boletas-iva.component";

const app_routes: Routes = [
  { path: "home", component: LoginComponent },
  { path: "transferencias", component: TransferenciasComponent },
  { path: "parametros", component: ParametrosComponent },
  { path: "cuentas", component: CuentasComponent },
  { path: "reporte", component: ReporteComponent },
  { path: "compras", component: ComprasComponent },
  { path: "boletas", component: BoletasComponent },
  { path: "registrados", component: RegistradosComponent },
  { path: "boletas-iva", component: BoletasIvaComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(app_routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
