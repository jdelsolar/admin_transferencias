import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../url.config";
import { Observable, observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ParametrosService {
  //tasa: Observable<string>;

  constructor(private http: HttpClient) {}

  observarTasa(): Observable<string> {
    return new Observable(observer => {
      this.obtenerTasa().then((resp: string) => {
        observer.next(resp);
      });
      const intervalo = setInterval(() => {
        this.obtenerTasa().then((resp: string) => {
          observer.next(resp);
        });
      }, 30000);
    });
  }

  obtenerTasa() {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/parametros/obtener_tasa";
      this.http.get(url).subscribe(
        (resp: any) => {
          //this.tasa = resp.tasa;
          resolve(resp.tasa);
        },
        err => reject()
      );
    });
  }

  cambiarTasa(val: string) {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/parametros/actualizar_tasa";
      this.http.post(url, { tasa: val }).subscribe(
        (resp: any) => {
          //this.tasa = resp.tasa;
          resolve();
        },
        err => reject()
      );
    });
  }
}
