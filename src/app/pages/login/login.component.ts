import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo:string = "";
  clave: string = "";

  cargando: boolean = false;

  constructor( public _usuario: UsuarioService ) { }

  ngOnInit() {
  }

  login(){

    this.cargando = true;

    this._usuario.loginAdmin( this.correo, this.clave ).then( resp => {
      this.cargando = false;
    });
  }

}
