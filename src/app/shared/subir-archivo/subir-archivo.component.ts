import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from "@angular/core";
import {
  SubirArchivoService,
  UploadData
} from "../../services/subir-archivo.service";

@Component({
  selector: "app-subir-archivo",
  templateUrl: "./subir-archivo.component.html",
  styleUrls: ["./subir-archivo.component.css"]
})
export class SubirArchivoComponent implements OnInit {
  @ViewChild("txtInput")
  txtInput: ElementRef;
  @Output()
  datosArchivo: EventEmitter<UploadData> = new EventEmitter();
  archivoSubir: File;
  cargando: boolean = false;
  // uploadData: any = null;

  constructor(private _subir: SubirArchivoService) {}

  ngOnInit() {}

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.archivoSubir = null;
      return;
    }
    this.txtInput.nativeElement.innerHTML = archivo.name;
    this.archivoSubir = archivo;
  }

  subirArchivo() {
    if (!this.archivoSubir) {
      return;
    }
    this.cargando = true;
    this._subir
      .subirArchivo(this.archivoSubir)
      .then((resp: string) => {
        const data = JSON.parse(resp);
        this.cargando = false;
        swal("Archivo Subido", "Archivo subido correctamente.", "success");
        this.archivoSubir = null;
        // this.uploadData = data.mensaje.upload_data;
        this.datosArchivo.emit(data.mensaje.upload_data);
      })
      .catch((err: string) => {
        this.cargando = false;
        const data = JSON.parse(err);
        swal("Error", data.mensaje.error, "error");
        this.archivoSubir = null;
      });
  }
}
