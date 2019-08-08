import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../url.config";
import { UsuarioService } from "./usuario.service";

@Injectable({
  providedIn: "root"
})
export class TransferenciasService {
  estados = ["Aprobado", "Rechazado", "Pendiente", "Finalizado"];

  transferencias: TransferenciaDestinatario[] = [];

  registros: number = 0;

  pag: number = 0;

  paginas: number[] = [];

  constructor(private http: HttpClient, public _usuario: UsuarioService) {}

  cargarTransferencias(token: string, pag: number, estado = "") {
    const url =
      URL_SERVICIOS +
      "/transferencias/transferencias_admin/" +
      token +
      "/" +
      pag +
      "/" +
      estado;

    this.http.get(url).subscribe(
      (resp: any) => {
        if (resp.respuesta) {
          this.transferencias = resp.transferencias;
          this.registros = resp.registros;
          // tslint:disable-next-line:radix
          const total = parseInt("" + this.registros / 10);
          this.paginas = [];
          for (let i = 0; i <= total; i++) {
            this.paginas.push(i);
          }
        }
      },
      (err: any) => {
        if (err.starus === 401) {
          this._usuario.cerrarSesion();
        }
      }
    );
  }

  aprobar(id: string, token: string) {
    const url = URL_SERVICIOS + "/transferencias/aprobar_admin";

    return this.http.post(url, { id: id, token: token });
  }

  rechazar(id: string, motivo: string, token: string) {
    const url = URL_SERVICIOS + "/transferencias/rechazar_admin";

    return this.http.post(url, { token: token, id: id, motivo: motivo });
  }

  finalizar(id_transferencia: string, token: string, nombre_archivo: string) {
    const url = URL_SERVICIOS + "/transferencias/admin_finalizar";

    return this.http.post(url, {
      token: token,
      id_transferencia: id_transferencia,
      nombre_archivo: nombre_archivo
    });
  }

  listar() {
    const url = URL_SERVICIOS + "/usuario/listar";

    return this.http.get(url);
  }

  eliminar(token: string, id_transferencia: string) {
    // admin_eliminar
    const url = URL_SERVICIOS + "/transferencias/admin_eliminar";
    return this.http.post(url, {
      token: token,
      id_transferencia: id_transferencia
    });
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
  telefono?: string;
  foto?: string;
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
  imagen_deposito?: string;
  tipo_pago?: string;
}
