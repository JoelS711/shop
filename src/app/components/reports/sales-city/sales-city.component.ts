import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-city',
  templateUrl: './sales-city.component.html',
  styleUrl: './sales-city.component.css'
})
export class SalesCityComponent {
  constructor(private objetohttp: HttpClient) { }

  
  apiURLConsolidated: string = "http://localhost:8085/api/consolidated";
  codeget:number=0;
  res:any;
  content:any;
  iva:any;
  totalsale:any;
  total:any;
  getConsolidated(city: string) {
    this.res = this.objetohttp.get(this.apiURLConsolidated + "/city/" + city, {observe: 'response'});
    this.res.subscribe((response: HttpResponse<any>) => {
      this.content = response.body;
      this.codeget = response.status;
      console.log(response);
       this.iva = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
        this.content.iva,
      );
      this.totalsale = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
        this.content.totalsale,
      );
      this.total = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
        this.content.total,
      );

      

    });
  }
}
