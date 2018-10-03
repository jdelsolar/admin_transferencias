import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Usuario } from "../../../services/usuario.service";
import { CuentasService } from "../../../services/cuentas.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"]
})
export class FormularioComponent implements OnInit {
  private _cuentaModificar: Usuario = null;

  forma: FormGroup;

  get cuentaModificar(): Usuario {
    return this._cuentaModificar;
  }

  @Input()
  set cuentaModificar(usr: Usuario) {
    this._cuentaModificar = usr;
    if (this.forma) {
      if (this.cuentaModificar) {
        this.forma.setValue({
          id: this.cuentaModificar.id,
          correo: this.cuentaModificar.correo,
          nombre: this.cuentaModificar.nombre,
          clave: this.cuentaModificar.clave,
          rol: this.cuentaModificar.rol
        });
        this.correo.nativeElement.focus();
      }
    }
  }

  @ViewChild("correo")
  correo: ElementRef;

  constructor(public _cuenta: CuentasService) {}

  ngOnInit() {
    this.forma = new FormGroup({
      id: new FormControl(""),
      correo: new FormControl("", [Validators.required, Validators.email]),
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      clave: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      rol: new FormControl("", Validators.required)
    });

    // llenar si viene un input
  }

  nuevo() {
    this.forma.setValue({
      id: "",
      correo: "",
      nombre: "",
      clave: "",
      rol: ""
    });
    this.correo.nativeElement.focus();
    this.cuentaModificar = null;
  }

  agregar_modificar() {
    if (!this.forma.valid) {
      return;
    }
    const usr: Usuario = {
      id: this.forma.get("id").value,
      correo: this.forma.get("correo").value,
      nombre: this.forma.get("nombre").value,
      clave: this.forma.get("clave").value,
      rol: this.forma.get("rol").value
    };
    if (usr.id === "") {
      // hay que agregar
      this._cuenta.agregar(usr);
    } else {
      this._cuenta.modificar(usr);
    }
  }
}
