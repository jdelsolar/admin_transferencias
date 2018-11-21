import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ParametrosService } from "../../services/parametros.service";
import { Subscription } from "rxjs";
import swal from "sweetalert";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-parametros",
  templateUrl: "./parametros.component.html",
  styleUrls: ["./parametros.component.css"]
})
export class ParametrosComponent implements OnInit, OnDestroy {
  forma: FormGroup;

  constructor(
    private _parametros: ParametrosService,
    public _usuario: UsuarioService
  ) {}

  sub: Subscription;

  ngOnInit() {
    this.forma = new FormGroup({
      tasa: new FormControl("", [Validators.required, Validators.min(0)]),
      vendedor: new FormControl("", [Validators.required, Validators.min(0)])
    });

    // this.sub = this._parametros.observarTasa().subscribe(val => {
    //   this.forma.get("tasa").setValue(val);
    // });
    this.sub = this._parametros.observarParametros().subscribe(resp => {
      this.forma.setValue({ tasa: resp.tasa, vendedor: resp.vendedor });
    });
  }

  get tasa() {
    return this.forma.get("tasa");
  }
  get vendedor() {
    return this.forma.get("vendedor");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  enviarTasa() {
    if (this.forma.valid) {
      console.log("Formulario correcto");
      this.sub.unsubscribe();

      this._parametros.cambiarTasa(this.forma.get("tasa").value).then(() => {
        this.sub = this._parametros.observarTasa().subscribe(val => {
          this.forma.get("tasa").setValue(val);
        });
        swal("Se ha cambiado la tasa");
      });
    }
  }

  actualizarParametros() {
    if (this.forma.valid) {
      this.sub.unsubscribe();

      this._parametros.actualizarParametros(this.forma.value).then(() => {
        this.sub = this._parametros.observarParametros().subscribe(val => {
          this.forma.setValue({ tasa: val.tasa, vendedor: val.vendedor });
        });
        swal("Se actualizaron los parámetros");
      });
    }
  }
}
