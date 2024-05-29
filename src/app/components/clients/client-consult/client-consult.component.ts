import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-consult',
  templateUrl: './client-consult.component.html',
  styleUrl: './client-consult.component.css'
})
export class ClientConsultComponent implements OnInit{
  constructor(private objetohttp: HttpClient) { }

  ngOnInit(): void {
  }
  res: any;
  urlapi: string = "https://shop-service-client-provider.onrender.com/api/clients";
  cont:any;
  cedulasearch!: string;
  contenido: any;
  codeget:any;
  buscarCliente() {
      this.res = this.objetohttp.get(this.urlapi + "/identification/" + this.cedulasearch, {observe: 'response'});
      this.res.subscribe((response: HttpResponse<any>) => {
        this.contenido = response.body;
        this.codeget = response.status;
        console.log(response);

        

      });
    }
}
