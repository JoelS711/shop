import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {

  constructor(private clientehttp: HttpClient) { }

  apiURL: string = "http://localhost:8082/api/";
  apiURLClient: string = "http://localhost:8081/api/";
  apiURLProduct: string = "http://localhost:8080/api/";
  apiURLConsolidated: string = "http://localhost:8085/api/";


}
