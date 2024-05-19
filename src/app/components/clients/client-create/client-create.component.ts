import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css'
})
export class ClientCreateComponent implements OnInit {

  constructor(private objetohttp: HttpClient) { }


  res: any;
  contenido: any;
  urlapi: string = "http://localhost:8081/api/clients";

  cedulainsert!: string;
  direccioninsert!: string;
  emailinsert!: string;
  nombreinsert!: string;
  telefonoinsert!: string;
  codepost!: number;

  insertarCliente() {
    this.objetohttp.post(this.urlapi, {
      "identification": this.cedulainsert,
      "address": this.direccioninsert,
      "email": this.emailinsert,
      "name": this.nombreinsert,
      "phone": this.telefonoinsert
    }, {
      observe: 'response'
    }).subscribe(
      response => {
        this.codepost = response.status;
        this.cedulainsert = "";
        this.direccioninsert = "";
        this.emailinsert = "";
        this.nombreinsert = "";
        this.telefonoinsert = "";
      }
    )

  }


  ngOnInit(): void {
  }

  
}
