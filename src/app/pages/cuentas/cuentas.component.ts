import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../services/usuario.service";

@Component({
  selector: "app-cuentas",
  templateUrl: "./cuentas.component.html",
  styleUrls: ["./cuentas.component.css"]
})
export class CuentasComponent implements OnInit {
  cuentaModificar: Usuario = null;

  constructor() {}

  ngOnInit() {}

  modificar(usuario: Usuario) {
    // console.log(usuario);

    this.cuentaModificar = usuario;
  }
}
