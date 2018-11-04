import { Component, OnInit } from "@angular/core";
import { AgregarComponent } from "./modals/agregar/agregar.component";
import { DialogService } from "ng2-bootstrap-modal";
import { ComprasService } from "src/app/services/compras.service";

@Component({
  selector: "app-compras",
  templateUrl: "./compras.component.html",
  styleUrls: ["./compras.component.css"]
})
export class ComprasComponent implements OnInit {
  constructor(private dialogService: DialogService, public _compras: ComprasService) {}

  ngOnInit() {}

  mostrarModalCompra() {
    let disposable = this.dialogService
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
}
