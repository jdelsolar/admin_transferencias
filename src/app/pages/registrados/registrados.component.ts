import { Component, OnInit } from '@angular/core';
import { TransferenciasService, Usuario } from 'src/app/services/transferencias.service';

@Component({
  selector: 'app-registrados',
  templateUrl: './registrados.component.html',
  styleUrls: ['./registrados.component.css']
})
export class RegistradosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(public _transferencias: TransferenciasService) { }

  ngOnInit() {
    this._transferencias.listar().subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      console.log(this.usuarios);
      
    } );


     
  }

}
