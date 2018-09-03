import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../url.config";

@Injectable({
  providedIn: "root"
})
export class TransferenciasService {
  transferencias: TransferenciaDestinatario[] = [];

  constructor(private http: HttpClient) {}

  cargarTransferencias() {
    let url = URL_SERVICIOS + "/transferencias/transferencias_admin";

    this.http.get(url).subscribe((resp: any) => {
      if ( resp.respuesta ){
        this.transferencias = resp.transferencias;
      }
    }, err => {

    });
  }

  aprobar( id:string ) {
    let url = URL_SERVICIOS + "/transferencias/aprobar_admin";

    return this.http.post( url, { id: id } );

  }
}

export interface TransferenciaDestinatario {
  transferencia?: Transferencia;
  destinatario?: Destinatario;
  usuario?: Usuario;
}

export interface Usuario {
  id_usuario?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fecha_registro?: string;
  pais?: string;
  correo?: string;
  clave?: string;
  token?: any;
}

export interface Destinatario {
  id?: string;
  pais?: string;
  nombre?: string;
  ci?: string;
  banco?: string;
  tipo_cuenta?: string;
  ncuenta?: string;
  correo?: string;
  fecha?: string;
  id_usuario?: string;
}

export interface Transferencia {
  id?: string;
  id_destinatario?: string;
  imagen?: string;
  monto?: string;
  tasa?: string;
  estado?: string;
  fecha?: string;
  fecha_estado?: string;
  id_usuario?: string;
}
