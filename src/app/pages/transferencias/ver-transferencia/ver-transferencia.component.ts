import { Component, OnInit, Input } from "@angular/core";
import { TransferenciaDestinatario } from "../../../services/transferencias.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-ver-transferencia",
  templateUrl: "./ver-transferencia.component.html",
  styleUrls: ["./ver-transferencia.component.css"]
})
export class VerTransferenciaComponent implements OnInit {
  @Input()
  tranferencia: TransferenciaDestinatario = {};

  constructor( public _usuario: UsuarioService ) {}

  ngOnInit() {}

  totalBs() {
    if (this.tranferencia.transferencia) {
      return (
        parseFloat(this.tranferencia.transferencia.monto) *
        parseFloat(this.tranferencia.transferencia.tasa)
      );
    }
  }
}
