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
  urlapi: string = "https://shop-service-client-provider.onrender.com/api/clients";

  cedulainsert!: string;
  direccioninsert!: string;
  emailinsert!: string;
  nombreinsert!: string;
  telefonoinsert!: string;
  codepost!: number;

  insertClient() {
    if(!this.cedulainsert || !this.direccioninsert || !this.emailinsert || !this.nombreinsert || !this.telefonoinsert){
      this.codepost = 400;
    }else{
      
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

  }


  ngOnInit(): void {
  }

  
}
