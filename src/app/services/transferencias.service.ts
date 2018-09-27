import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../url.config";

@Injectable({
  providedIn: "root"
})
export class TransferenciasService {
  transferencias: TransferenciaDestinatario[] = [];

  registros: number = 0;

  pag: number = 0;

  paginas: number[] = [];

  constructor(private http: HttpClient) {}

  cargarTransferencias(token: string, pag: number) {
    const url =
      URL_SERVICIOS +
      "/transferencias/transferencias_admin/" +
      token +
      "/" +
      pag;

    this.http.get(url).subscribe(
      (resp: any) => {
        if (resp.respuesta) {
          this.transferencias = resp.transferencias;
          this.registros = resp.registros;
          let total = parseInt("" + this.registros / 10);
          this.paginas = [];
          for (let i = 0; i <= total; i++) {
            this.paginas.push(i);
          }
        }
      },
      err => {}
    );
  }

  aprobar(id: string) {
    const url = URL_SERVICIOS + "/transferencias/aprobar_admin";

    return this.http.post(url, { id: id });
  }

  rechazar( id: string, motivo: string, token: string ) {
    const url = URL_SERVICIOS + '/transferencias/rechazar_admin';

    return this.http.post( url, { token: token, id: id, motivo: motivo } );
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
  ci?: string;
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
  motivo_rechazo?: string;
  fecha_apr_rech?: string;
}
