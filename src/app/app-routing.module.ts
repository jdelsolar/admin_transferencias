import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { TransferenciasComponent } from "./pages/transferencias/transferencias.component";
import { ParametrosComponent } from "./pages/parametros/parametros.component";
import { CuentasComponent } from "./pages/cuentas/cuentas.component";

const app_routes: Routes = [
  { path: "home", component: LoginComponent },
  { path: "transferencias", component: TransferenciasComponent },
  { path: "parametros", component: ParametrosComponent },
  { path: "cuentas", component: CuentasComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(app_routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
