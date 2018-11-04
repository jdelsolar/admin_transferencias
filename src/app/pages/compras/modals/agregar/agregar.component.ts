import { Component } from "@angular/core";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ComprasService } from "src/app/services/compras.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";

export interface ConfirmModel {
  title: string;
  message: string;
}
@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.component.html",
  styleUrls: ["./agregar.component.css"]
})
export class AgregarComponent extends DialogComponent<ConfirmModel, boolean>
  implements ConfirmModel {
  title: string = "Agregar Compra";
  message: string;

  forma: FormGroup;

  constructor(dialogService: DialogService, public compras: ComprasService) {
    super(dialogService);

    this.forma = new FormGroup({
      chp: new FormControl("", [Validators.required]),
      bs: new FormControl("", Validators.required)
    });
  }

  get chp() {
    return this.forma.get("chp");
  }
  get bs() {
    return this.forma.get("bs");
  }

  confirm() {
    if (!this.forma.valid) {
      return;
    }
    this.compras
      .agregarCompra(this.forma.get("chp").value, this.forma.get("bs").value)
      .then(() => {
        this.result = true;
        this.close();
      });
  }
}
