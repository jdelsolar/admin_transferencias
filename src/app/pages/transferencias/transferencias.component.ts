import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';
import { TransferenciasService } from '../../services/transferencias.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  constructor( public _usuario:UsuarioService, public _tansf: TransferenciasService ) { }

  ngOnInit() {

    this._tansf.cargarTransferencias();

  }

}
