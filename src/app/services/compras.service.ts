import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../url.config";

@Injectable({
  providedIn: "root"
})
export class ComprasService {
  compras: any[] = [];
  cargando = false;
  margen: number = 11;

  bancos: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarCompras().then(() => {
      this.compras.forEach(c => this.transferenciasPorCompra(c.id));
    });
    this.getBancos();
  }

  agregarCompra(compra: any) {
    return new Promise((resolve, reject) => {
      this.cargando = true;
      const url = URL_SERVICIOS + "/compras/insert_compra";
      const params = compra;
      this.http.post(url, params).subscribe(
        (resp: any) => {
          this.cargando = false;
          this.cargarCompras().then(() => {
            this.compras.forEach(c => this.transferenciasPorCompra(c.id));
          });
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
    return new Promise((resolve, reject) => {
      this.cargando = true;
      const url = URL_SERVICIOS + "/compras/list_compras";
      this.http.get(url).subscribe(
        (resp: any) => {
          this.compras = resp.compras;
          this.cargando = false;
          this.calcularTasa();
          resolve();
        },
        err => {
          this.cargando = false;
          swal("Error al cargar la lista de compras.");
          reject();
        }
      );
    });
  }

  private calcularTasa() {
    this.compras.forEach((compra: any) => {
      compra.tasaMax = parseFloat(compra.montobs) / parseFloat(compra.montochp);
    });
  }

  deleteCompra(id) {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/compras/delete_compra";
      this.cargando = true;
      this.http.post(url, { id: id }).subscribe(
        (resp: any) => {
          this.cargando = false;
          this.cargarCompras().then(() => {
            this.compras.forEach(c => this.transferenciasPorCompra(c.id));
          });
          resolve();
        },
        err => {
          swal("Error al borrar la compra");
          this.cargando = false;
          reject();
        }
      );
    });
  }

  transferenciasPorCompra(id_compra) {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/compras/transferencias_por_compra";
      this.cargando = true;
      this.http.post(url, { id_compra: id_compra }).subscribe(
        (resp: any) => {
          const compra = this.compras.find(x => x.id === id_compra);
          if (resp.transferencias) {
            compra.transferencias = resp.transferencias;
          }
          this.cargando = false;
          resolve();
        },
        err => {
          swal("Error al cargar las transferencias.");
          this.cargando = false;
          reject();
        }
      );
    });
  }

  insertTransferencia(tran: any) {
    return new Promise((resolve, reject) => {
      const url = URL_SERVICIOS + "/compras/insert_transferencia";
      this.cargando = true;
      this.http.post(url, tran).subscribe(
        (resp: any) => {
          this.transferenciasPorCompra(resp.transferencia.id_compra);
          this.cargando = false;
          resolve();
        },
        err => {
          swal("Error agregar transferencia.");
          this.cargando = false;
          reject();
        }
      );
    });
  }

  saldoCHP(compra) {
    let saldo = 0;
    if (compra.transferencias) {
      compra.transferencias.forEach(t => {
        saldo += parseFloat(t.transferencia.monto);
      });
    }

    return compra.montochp - saldo;
  }

  saldoBs(compra) {
    let saldo = 0;
    if (compra.transferencias) {
      compra.transferencias.forEach(t => {
        saldo +=
          parseFloat(t.transferencia.monto) * parseFloat(t.transferencia.tasa);
      });
    }
    return (
      Math.round(
        (parseFloat(compra.montobs) + parseFloat(compra.saldo) - saldo) * 100
      ) / 100
    );
  }

  saldoTasa(compra) {
    return this.saldoBs(compra) / this.saldoCHP(compra);
  }

  montoBs(t) {
    return Math.round(t.transferencia.monto * t.transferencia.tasa * 100) / 100;
  }

  deleteTransferencia(transferencia) {
    if (!confirm("Esta seguro de borrar la transferencia?")) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.cargando = true;
      const url = URL_SERVICIOS + "/compras/delete_transferencia";
      this.http
        .post(url, { id_transferencia: transferencia.transferencia.id })
        .subscribe(
          (resp: any) => {
            this.transferenciasPorCompra(transferencia.transferencia.id_compra);
            this.cargando = false;
            resolve();
          },
          err => {
            swal("No se puede borrar la transferencia");
            this.cargando = false;
            reject();
          }
        );
    });
  }

  tasaMargen(compra) {
    return compra.tasaMax / (this.margen / 100 + 1);
  }

  sumaCHP(compra) {
    let saldo = 0;
    if (compra.transferencias) {
      compra.transferencias.forEach(t => {
        saldo += parseFloat(t.transferencia.monto);
      });
    }

    return saldo;
  }

  getBancos() {
    this.http.get("assets/data/bancos.json").subscribe((resp: any) => {
      this.bancos = resp.bancos;
    });
  }

  totalBs(compra: any) {
    return (
      Math.round(
        (parseFloat(compra.saldo) + parseFloat(compra.montobs)) * 100
      ) / 100
    );
  }
}
