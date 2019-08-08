import { Component, OnInit, OnDestroy } from "@angular/core";
import { AgregarComponent } from "./modals/agregar/agregar.component";
import { DialogService } from "ng2-bootstrap-modal";
import { ComprasService } from "src/app/services/compras.service";
import { Subscription } from "rxjs";
import { TransferenciaComponent } from "./modals/transferencia/transferencia.component";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-compras",
  templateUrl: "./compras.component.html",
  styleUrls: ["./compras.component.css"]
})
export class ComprasComponent implements OnInit, OnDestroy {
  constructor(
    private dialogService: DialogService,
    public _compras: ComprasService,
    public usuario: UsuarioService
  ) {}

  modalCompra: Subscription;
  modalTransferencia: Subscription;


  ngOnInit() {}

  ngOnDestroy() {
    if (this.modalCompra) {
      this.modalCompra.unsubscribe();
    }
    if (this.modalTransferencia) {
      this.modalTransferencia.unsubscribe();
    }
  }

  mostrarModalCompra() {
    
    this.modalCompra = this.dialogService
      .addDialog(AgregarComponent, {
        title: "Agregar Compra",
        message: "Confirm message",
        saldoAnterior: "" + this._compras.compras[0].saldo
      })
      .subscribe(isConfirmed => {
        //We get dialog result
        if (isConfirmed) {
        } else {
        }
      });
  }

  borrar(id) {
    this._compras.deleteCompra(id).then(() => {});
  }

  mostrarModalTransferencia() {
    this.modalTransferencia = this.dialogService
      .addDialog(TransferenciaComponent, {
        title: "Agregar Compra",
        message: "Confirm message"
      })
      .subscribe(isConfirmed => {
        //We get dialog result
        if (isConfirmed) {
        } else {
        }
      });
  }

  redondear( num ) {
    return Math.round(num);
  }

  fecha(fecha) {
    const _fecha = new Date(fecha);
    return _fecha.toLocaleDateString();
  }
}
