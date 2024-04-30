import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrl: './supplier-create.component.css'
})
export class SupplierCreateComponent implements OnInit {

  constructor(private objetohttp: HttpClient) { }


  res: any;
  contenido: any;
  urlapi: string = "http://localhost:8081/api/suppliers";

  nitinsert!: string;
  direccioninsert!: string;
  emailinsert!: string;
  nombreinsert!: string;
  telefonoinsert!: string;
  codepost!: number;

  insertarCliente() {
    this.objetohttp.post(this.urlapi, {
      "nit": this.nitinsert,
      "address": this.direccioninsert,
      "email": this.emailinsert,
      "namesupplier": this.nombreinsert,
      "phone": this.telefonoinsert
    }, {
      observe: 'response'
    }).subscribe(
      response => {
        this.codepost = response.status;
        this.nitinsert = "";
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
