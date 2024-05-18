import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-city',
  templateUrl: './sales-city.component.html',
  styleUrl: './sales-city.component.css'
})
export class SalesCityComponent {
  constructor(private clientehttp: HttpClient) { }

  apiURL: string = "http://localhost:8082/api/";
  apiURLClient: string = "http://localhost:8081/api/";
  apiURLProduct: string = "http://localhost:8080/api/";
  apiURLConsolidated: string = "http://localhost:8085/api/";
}
