import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {

  constructor(private clientehttp: HttpClient) { }

  apiURL: string = "http://localhost:8086/api/report";
  resp:any;
  data:any;
  codeget:number=0;
  getReport(city: string){

    this.resp = this.clientehttp.get(this.apiURL + "/city/" + city,{observe: 'response'});
    this.resp.subscribe((response: HttpResponse<any>) => {
      this.data = response.body;
      this.codeget = response.status;
    })
  }

}
