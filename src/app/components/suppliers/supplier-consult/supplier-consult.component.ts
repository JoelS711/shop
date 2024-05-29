import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-consult',
  templateUrl: './supplier-consult.component.html',
  styleUrl: './supplier-consult.component.css'
})
export class SupplierConsultComponent implements OnInit{
  constructor(private objetohttp: HttpClient) { }

  ngOnInit(): void {
  }
  res: any;
  urlapi: string = "https://shop-service-client-provider.onrender.com/api/suppliers";
  cont:any;
  nitsearch!: string;
  contenido: any;
  codeget:any;
  searchSupplier() {
      this.res = this.objetohttp.get(this.urlapi + "/nit/" + this.nitsearch, {observe: 'response'});
      this.res.subscribe((response: HttpResponse<any>) => {
        this.contenido = response.body;
        this.codeget = response.status;
        console.log(response);
      });
    }
}
