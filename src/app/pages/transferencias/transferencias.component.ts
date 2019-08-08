import { Component, OnInit } from "@angular/core";

import { UsuarioService } from "../../services/usuario.service";
import {
  TransferenciasService,
  TransferenciaDestinatario
} from "../../services/transferencias.service";

import swal from "sweetalert";

import { _sanitizeHtml } from "@angular/core/src/sanitization/html_sanitizer";

@Component({
  selector: "app-transferencias",
  templateUrl: "./transferencias.component.html",
  styleUrls: ["./transferencias.component.css"]
})
export class TransferenciasComponent implements OnInit {
  tran: TransferenciaDestinatario = {};
  id_rechazo: string = null;
  id_finalizar: string = null;

  //cod: string = "CLP";

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
      err => {
        console.log(err);
      }
    );
  }

  eliminar(id: string) {
    const token = this._usuario.usuario.token;

    if (confirm("Está seguro que desea eliminar la transacción?")) {
      // eliminamos la transferencia
      this._tansf.eliminar(token, id).subscribe(
        (resp: any) => {
          this._tansf.cargarTransferencias(
            this._usuario.usuario.token,
            this._tansf.pag
          );
        },
        err => {}
      );
    }
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

  adjuntarComprobante(event) {
    document.getElementById("btn-comprobante").click();

    // El archivo esta subido falta finalizar transferencia
    this._tansf
      .finalizar(
        this.id_finalizar,
        this._usuario.usuario.token,
        event.file_name
      )
      .subscribe((resp: any) => {
        this._tansf.cargarTransferencias(
          this._usuario.usuario.token,
          this._tansf.pag
        );
      });
  }
  modalAdjuntar(tranf: TransferenciaDestinatario) {
    this.id_finalizar = tranf.transferencia.id;
    document.getElementById("btn-comprobante").click();
  }

  cambiar(estado) {
    this._tansf.cargarTransferencias(
      this._usuario.usuario.token,
      this._tansf.pag,
      estado
    );
  }
}
