import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../url.config";

@Injectable({
  providedIn: "root"
})
export class ComprasService {
  compras: any[] = [];
  cargando = false;

  constructor(private http: HttpClient) {
    this.cargarCompras();
  }

  agregarCompra(montoCHP, montoBs) {
    return new Promise((resolve, reject) => {
      this.cargando = true;
      const url = URL_SERVICIOS + "/compras/insert_compra";
      const params = {
        montochp: montoCHP,
        montobs: montoBs
      };
      this.http.post(url, params).subscribe(
        (resp: any) => {
          this.cargando = false;
          this.cargarCompras();
          resolve();
        },
        err => {
          swal("Ocurrió un error.");
          this.cargando = false;
          reject();
        }
      );
    });
  }

  cargarCompras() {
    this.cargando = true;
    const url = URL_SERVICIOS + "/compras/list_compras";
    this.http.get(url).subscribe(
      (resp: any) => {
        this.compras = resp.compras;
        this.cargando = false;
        this.calcularTasa();
        console.log(this.compras);
      },
      err => {
        this.cargando = false;
        swal("Error al cargar la lista de compras.");
      }
    );
  }

  private calcularTasa() {
    this.compras.forEach((compra: any) => {
      compra.minTasa = parseFloat(compra.montobs) / parseFloat(compra.montochp);
    });
  }
}
