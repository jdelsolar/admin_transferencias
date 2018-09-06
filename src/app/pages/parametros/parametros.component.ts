import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ParametrosService } from "../../services/parametros.service";
import { Subscription } from "rxjs";
import swal from 'sweetalert';
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-parametros",
  templateUrl: "./parametros.component.html",
  styleUrls: ["./parametros.component.css"]
})
export class ParametrosComponent implements OnInit {
  forma: FormGroup;

  constructor( private _parametros: ParametrosService, public _usuario: UsuarioService ) {}

  sub: Subscription;

  ngOnInit() {
        
    this.forma = new FormGroup({
      tasa: new FormControl("", [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")])
    });

    this.sub = this._parametros.observarTasa().subscribe( val => {
      this.forma.get('tasa').setValue(val);
    });
    
  }

  enviarTasa() {
    if ( this.forma.valid ) {
      console.log('Formulario correcto');
      this.sub.unsubscribe();

      this._parametros.cambiarTasa(this.forma.get('tasa').value).then( () => {
        this.sub = this._parametros.observarTasa().subscribe( val => {
          this.forma.get('tasa').setValue(val);
        });
        swal( 'Se ha cambiado la tasa' );

      });

    }
  }
}
