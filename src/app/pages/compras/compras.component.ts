import { Component, OnInit, OnDestroy } from "@angular/core";
import { AgregarComponent } from "./modals/agregar/agregar.component";
import { DialogService } from "ng2-bootstrap-modal";
import { ComprasService } from "src/app/services/compras.service";
import { Subscription } from "rxjs";
import { TransferenciaComponent } from "./modals/transferencia/transferencia.component";

@Component({
  selector: "app-compras",
  templateUrl: "./compras.component.html",
  styleUrls: ["./compras.component.css"]
})
export class ComprasComponent implements OnInit, OnDestroy {
  constructor(private dialogService: DialogService, public _compras: ComprasService) {}

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
        message: "Confirm message"
      })
      .subscribe(isConfirmed => {
        //We get dialog result
        if (isConfirmed) {
        } else {
        }
      });
  }

  borrar(id) {
    this._compras.deleteCompra(id).then( () => {
      this._compras.cargarCompras();
    });

  }

  tieneTransferencia(compra) {
    if (compra.transferencias[0].id) {
      return false;
    } else {
      return true;
    }
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
}
