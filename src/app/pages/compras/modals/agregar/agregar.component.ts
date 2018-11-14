import { Component } from "@angular/core";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ComprasService } from "src/app/services/compras.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

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
      montochp: new FormControl("", [Validators.required]),
      montobs: new FormControl("", Validators.required),
      saldo: new FormControl(0, Validators.required),
    });
  }

  get montochp() {
    return this.forma.get("montochp");
  }
  get montobs() {
    return this.forma.get("montobs");
  }
  get saldo() {
    return this.forma.get("saldo");
  }

  confirm() {
    if (!this.forma.valid) {
      return;
    }
    this.compras
      .agregarCompra(this.forma.value)
      .then(() => {
        this.result = true;
        this.close();
      });
  }
}
