import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "../url.config";
import { HttpClient } from "@angular/common/http";
import swal from "sweetalert";
import { UsuarioService } from "./usuario.service";

@Injectable({
  providedIn: "root"
})
export class BoletasService {
  lista: Boleta[] = [];

  enviando: boolean = false;

  constructor(public http: HttpClient, private _usuario: UsuarioService) {}

  obtenerListaBoletas(pag = 0) {
    const url = URL_SERVICIOS + "/boletas/lista_boletas/" + pag;
    this.http.get(url).subscribe(
      (resp: any) => {
        if (resp.respuesta) {
          this.lista = resp.boletas;
        } else {
          swal("No se pudo cargar la lista de boletas");
        }
      },
      (err: any) => {
        swal("Ocurrió un error");
      }
    );
  }

  obtenerListaBoletasIva(pag = 0) {
    const url = URL_SERVICIOS + "/boletas/lista_boletas_afecta/" + pag;
    this.http.get(url).subscribe(
      (resp: any) => {
        if (resp.respuesta) {
          this.lista = resp.boletas;
        } else {
          swal("No se pudo cargar la lista de boletas");
        }
      },
      (err: any) => {
        swal("Ocurrió un error");
      }
    );
  }

  enviarBoleta(nombre: string, monto: string, fecha: string, rut: string) {
    this.enviando = true;

    const url =
      URL_SERVICIOS +
      "/boletas/obtener_token/" +
      this._usuario.usuario.token +
      "/?monto=" +
      monto +
      "&razonsocial=" +
      nombre +
      "&fecha=" +
      fecha +
      "&rut=" +
      rut;

      console.log(url);
      

    this.http.get(url).subscribe((resp: any) => {
      if (resp.respuesta) {
        this.enviando = false;
        this.obtenerListaBoletas(0);
        if (resp.boleta.IdResultadoFE != "0") {
          swal(resp.boleta.ResultadoFE);
        }
      } else {
        swal("Error al generar la boleta");
        this.enviando = false;
      }
    }, (err: any) => {
      swal("ocurrio un error");
      this.enviando = false;
    });
  }

  enviarBoletaIva(nombre: string, monto: string, fecha: string, rut: string) {
    this.enviando = true;

    const url =
      URL_SERVICIOS +
      "/boletas/boleta_con_iva/" +
      this._usuario.usuario.token +
      "/?monto=" +
      monto +
      "&razonsocial=" +
      nombre +
      "&fecha=" +
      fecha + ( rut ? "&rut=" + rut : '' );

      console.log(url);
      

    this.http.get(url).subscribe((resp: any) => {
      if (resp.respuesta) {
        this.enviando = false;
        this.obtenerListaBoletasIva(0);
        if (resp.boleta.IdResultadoFE != "0") {
          swal(resp.boleta.ResultadoFE);
        }
      } else {
        swal("Error al generar la boleta");
        this.enviando = false;
      }
    }, (err: any) => {
      swal("ocurrio un error");
      this.enviando = false;
    });
  }


}



interface Boleta {
  folio: string;
  nombre: string;
  monto: string;
  fecha: string;
  ambiente: string;
  pdf: string;
  rut: string;
}
