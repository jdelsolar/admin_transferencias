import { Component } from "@angular/core";
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ComprasService } from "src/app/services/compras.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
export interface TransferenciaModel {
  title: string;
  message: string;
}
@Component({
  selector: "app-transferencia",
  templateUrl: "./transferencia.component.html",
  styleUrls: ["./transferencia.component.css"]
})
export class TransferenciaComponent
  extends DialogComponent<TransferenciaModel, boolean>
  implements TransferenciaModel {
  title: string;
  message: string;

  forma: FormGroup;

  constructor(
    public dialogService: DialogService,
    public compras: ComprasService
  ) {
    super(dialogService);

    this.forma = new FormGroup({
      banco: new FormControl("", Validators.required),
      ci: new FormControl("", Validators.required),
      correo: new FormControl("", Validators.required),
      ncuenta: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      tipo_cuenta: new FormControl("Corriente", Validators.required),
      monto: new FormControl("", Validators.required),
      nombre_mostrar: new FormControl("", Validators.required)
    });
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    if (!this.forma.valid) {
      swal("Hay errores, revise el formulario");
      return;
    }
    console.log(this.forma.value);

    this.compras.insertTransferencia(this.forma.value).then(() => {
      this.result = true;
      this.close();
    });
  }
}
