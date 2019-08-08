import { Injectable } from "@angular/core";
import { Usuario, UsuarioService } from "./usuario.service";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../url.config";

@Injectable({
  providedIn: "root"
})
export class CuentasService {
  usuarios: Usuario[] = [];
  cargando = false;

  constructor(private http: HttpClient, public _usuario: UsuarioService) {
    if (this._usuario.usuario) {
      this.lista();
    }
  }

  lista() {
    this.cargando = true;

    const url =
      URL_SERVICIOS +
      "/admin_usuario/lista?id_usuario=" +
      this._usuario.usuario.id +
      "&token=" +
      this._usuario.usuario.token;
    this.http.get(url).subscribe(
      (resp: any) => {
        if (resp.respuesta) {
          this.cargando = false;
          this.usuarios = resp.lista;
        } else {
          console.log("error", resp);
          this.cargando = false;
        }
      },
      (err: any) => {
        console.log("Error", err);
        this.cargando = false;
        if(err.status === 401) {
          this._usuario.cerrarSesion();
        }
      }
    );
  }

  agregar(usuario: Usuario) {
    this.cargando = true;
    const url =
      URL_SERVICIOS +
      "/admin_usuario/crear/" +
      this._usuario.usuario.id +
      "/" +
      this._usuario.usuario.token;
    this.http
      .post(url, {
        correo: usuario.correo,
        nombre: usuario.nombre,
        clave: usuario.clave,
        rol: usuario.rol
      })
      .subscribe(
        (resp: any) => {
          this.cargando = false;
          this.lista();
        },
        err => {
          this.cargando = false;
          console.log(err);
        }
      );
  }

  modificar(usuario: Usuario) {
    this.cargando = true;
    const url =
      URL_SERVICIOS +
      "/admin_usuario/modificar/" +
      this._usuario.usuario.id +
      "/" +
      this._usuario.usuario.token;
    this.http
      .post(url, {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre,
        clave: usuario.clave,
        rol: usuario.rol
      })
      .subscribe(
        (resp: any) => {
          this.cargando = false;
          this.lista();
        },
        err => {
          this.cargando = false;
          console.log(err);
        }
      );
  }

  eliminar(usuario: Usuario) {
    this.cargando = true;
    const url =
      URL_SERVICIOS +
      "/admin_usuario/eliminar/" +
      this._usuario.usuario.id +
      "/" +
      this._usuario.usuario.token;
    this.http
      .post(url, {
        id: usuario.id
      })
      .subscribe(
        (resp: any) => {
          this.cargando = false;
          this.lista();
        },
        err => {
          this.cargando = false;
          console.log(err);
        }
      );
  }
}
