import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent implements OnInit {

  constructor(private objetohttp: HttpClient) { }

  ngOnInit(): void {
  }
  res: any;
  contenido: any;
  urlapi: string = "https://shop-service-client-provider.onrender.com/api/clients";

  cedulaupdate!: string;
  direccionupdate!: string;
  emailupdate!: string;
  nombreupdate!: string;
  telefonoupdate!: string;
  codeput!: number;
  updateClient() {
    if(!this.cedulaupdate || !this.direccionupdate || !this.emailupdate || !this.nombreupdate || !this.telefonoupdate){
this.codeput=400;
    }else{
      this.objetohttp.put(this.urlapi + "/identification/" + this.cedulaupdate,
        {
          "identification": this.cedulaupdate,
          "address": this.direccionupdate,
          "email": this.emailupdate,
          "name": this.nombreupdate,
          "phone": this.telefonoupdate
        }, {
        observe: 'response'
      }).subscribe(
        (response: any) => {
  
          this.codeput = response.status;
          this.cedulaupdate = "";
          this.direccionupdate = "";
          this.emailupdate = "";
          this.nombreupdate = "";
          this.telefonoupdate = "";
        }
      );
    }

    }
}
