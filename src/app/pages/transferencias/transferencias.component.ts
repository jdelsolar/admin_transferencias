import { Component, OnInit } from "@angular/core";

import { UsuarioService } from "../../services/usuario.service";
import { TransferenciasService } from "../../services/transferencias.service";

import swal from 'sweetalert';

@Component({
  selector: "app-transferencias",
  templateUrl: "./transferencias.component.html",
  styleUrls: ["./transferencias.component.css"]
})
export class TransferenciasComponent implements OnInit {
  constructor(
    public _usuario: UsuarioService,
    public _tansf: TransferenciasService
  ) {}

  ngOnInit() {
    this._tansf.cargarTransferencias();
  }

  aprobar(id: string) {
    console.log(id);
    
    this._tansf.aprobar(id).subscribe((resp: any) => {
      swal( "Transferencia aprobada" );

      this._tansf.cargarTransferencias();

    }, err => {  });
  }
}
