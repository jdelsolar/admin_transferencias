import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "../url.config";

@Injectable({
  providedIn: "root"
})
export class SubirArchivoService {
  constructor() {}

  subirArchivo(archivo: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append("archivo", archivo, archivo.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Archivo subido");
            resolve( xhr.response );
          } else {
            console.log("Error al subir archivo");
            reject( xhr.response );
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/do_upload';
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
}

export interface UploadData {
  file_name: string;
  file_type: string;
  file_path: string;
  full_path: string;
  raw_name: string;
  orig_name: string;
  client_name: string;
  file_ext: string;
  file_size: number;
  is_image: boolean;
  image_width: number;
  image_height: number;
  image_type: string;
  image_size_str: string;
}
