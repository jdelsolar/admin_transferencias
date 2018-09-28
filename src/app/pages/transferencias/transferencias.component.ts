import { Component, OnInit } from "@angular/core";

import { UsuarioService } from "../../services/usuario.service";
import {
  TransferenciasService,
  TransferenciaDestinatario
} from "../../services/transferencias.service";

import swal from "sweetalert";

@Component({
  selector: "app-transferencias",
  templateUrl: "./transferencias.component.html",
  styleUrls: ["./transferencias.component.css"]
})
export class TransferenciasComponent implements OnInit {
  tran: TransferenciaDestinatario = {};
  id_rechazo: string = null;

  constructor(
    public _usuario: UsuarioService,
    public _tansf: TransferenciasService
  ) {}

  ngOnInit() {
    this._tansf.cargarTransferencias(
      this._usuario.usuario.token,
      this._tansf.pag
    );
  }

  ver(transf: TransferenciaDestinatario) {
    this.tran = transf;
    document.getElementById("btn-modal").click();
  }

  aprobar(id: string) {
    const token = this._usuario.usuario.token;
    this._tansf.aprobar(id, token).subscribe(
      (resp: any) => {
        swal("Transferencia aprobada");

        this._tansf.cargarTransferencias(
          this._usuario.usuario.token,
          this._tansf.pag
        );
      },
      err => {}
    );
  }

  rechazar(id: string) {
    this.id_rechazo = id;
    document.getElementById("btn-rechazo").click();
  }

  rechazarMotivo(imotivo) {
    document.getElementById("btn-rechazo").click();
    this._tansf
      .rechazar(this.id_rechazo, imotivo, this._usuario.usuario.token)
      .subscribe(
        (resp: any) => {
          swal("Transferencia rechazada");

          this._tansf.cargarTransferencias(
            this._usuario.usuario.token,
            this._tansf.pag
          );
        },
        err => {}
      );
  }

  verPag(i: number) {
    this._tansf.pag = i;
    this._tansf.cargarTransferencias(
      this._usuario.usuario.token,
      this._tansf.pag
    );
  }

  totalBs(transf: TransferenciaDestinatario) {
    return (
      parseFloat(transf.transferencia.monto) *
      parseFloat(transf.transferencia.tasa)
    );
  }
}
