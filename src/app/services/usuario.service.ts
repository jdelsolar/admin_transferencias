import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../url.config";

import swal from "sweetalert";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario = {};

  constructor(private http: HttpClient) {
    if (localStorage.getItem("usuario")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    }
  }

  loginAdmin(correo, clave) {
    const url = URL_SERVICIOS + "/usuario/admin_login";

    return new Promise((resolve, reject) => {
      this.http.post(url, { correo: correo, clave: clave }).subscribe(
        (resp: any) => {
          if (resp.respuesta) {
            this.usuario = resp.usuario;
            // Guardar localstorage
            localStorage.setItem("usuario", JSON.stringify(this.usuario));

            swal(resp.mensaje);
            resolve(true);
          } else {
            swal(resp.mensaje);
            resolve(false);
          }
        },
        err => {
          swal("Lo sentimos, ocurrió un error");
          reject();
        }
      );
    });
  }

  cerrarSesion() {
    this.usuario = {};
    localStorage.clear();
  }
}

export interface Usuario {
  id?: string;
  correo?: string;
  nombre?: string;
  fecha?: string;
  token?: string;
  clave?: string;
  rol?: string;
}
