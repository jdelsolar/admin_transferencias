import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../url.config";
import { UsuarioService } from "./usuario.service";

@Injectable({
  providedIn: "root"
})
export class ReportesService {
  reporte_diario: any[] = [];

  constructor(public http: HttpClient, public _usuario: UsuarioService) {
    this.reporteDiario();
  }

  reporteDiario() {
    const url = URL_SERVICIOS + "/reportes/reporte_diario";
    const params = {
      id_usuario: this._usuario.usuario.id,
      token: this._usuario.usuario.token
    };
    this.http.post(url, params).subscribe(
      (resp: any) => {
        this.reporte_diario = resp.reporte;
      },
      err => {
        swal("Error al obtener el reporte.");
      }
    );
  }
}
