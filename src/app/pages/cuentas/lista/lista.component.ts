import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CuentasService } from "../../../services/cuentas.service";
import { Usuario } from "../../../services/usuario.service";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.css"]
})
export class ListaComponent implements OnInit {
  @Output()
  cuentaModificar: EventEmitter<Usuario> = new EventEmitter();

  constructor(public _cuentas: CuentasService) {}

  ngOnInit() {}

  modificar(usr: Usuario) {
    this.cuentaModificar.emit(usr);
  }

  eliminar(cuenta: Usuario) {
    if (confirm("Esta seguro que desea borrar la cuenta de " + cuenta.nombre)) {
      this._cuentas.eliminar(cuenta);
    }
  }

  mostrarRol(rol) {
    let _rol = "";
    switch (rol) {
      case "A":
        _rol = "Administrador";
        break;
      case "U":
        _rol = "Usuario";
        break;
      case "V":
        _rol = "Vendedor";
        break;
      default:
        break;
    }
    return _rol;
  }
}
