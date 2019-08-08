import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BoletasService } from 'src/app/services/boletas.service';

@Component({
  selector: 'app-boletas-iva',
  templateUrl: './boletas-iva.component.html',
  styleUrls: ['./boletas-iva.component.css']
})
export class BoletasIvaComponent implements OnInit {

  forma: FormGroup;

  pag: number = 0;

  constructor(public _boletas: BoletasService) { }

  ngOnInit() {
    var today = new Date();
    
    this.forma = new FormGroup({
      destinatario: new FormControl("", Validators.required),
      monto: new FormControl("", [Validators.required]),
      fecha: new FormControl(today.toISOString().substring(0,10), [Validators.required]),
      rut: new FormControl("")
    });

    this._boletas.obtenerListaBoletasIva(0);
  }

  get destinatario() {
    return this.forma.get("destinatario");
  }

  get monto() {
    return this.forma.get("monto");
  }
  get fecha() {
    return this.forma.get("fecha");
  }

  get rut() {
    return this.forma.get("rut");
  }

  confirm() {
    this._boletas.enviarBoletaIva(this.destinatario.value, this.monto.value, this.fecha.value, this.rut.value );
    this.monto.setValue("");
    this.destinatario.setValue("");
    var today = new Date();
    this.fecha.setValue(today.toISOString().substring(0,10));
  }

  retrocedePag() {
    if(this.pag > 0) {
      this.pag -= 1;
    }
    this._boletas.obtenerListaBoletasIva(this.pag);
  }

  avanzaPag() {
    this.pag += 1;
    this._boletas.obtenerListaBoletasIva(this.pag);
  }

}
