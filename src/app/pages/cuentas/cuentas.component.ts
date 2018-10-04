import { Component, OnInit } from "@angular/core";
import { Usuario, UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-cuentas",
  templateUrl: "./cuentas.component.html",
  styleUrls: ["./cuentas.component.css"]
})
export class CuentasComponent implements OnInit {
  cuentaModificar: Usuario = null;

  constructor( public _usuario: UsuarioService ) {}

  ngOnInit() {}

  modificar(usuario: Usuario) {
    // console.log(usuario);

    this.cuentaModificar = usuario;
  }
}
