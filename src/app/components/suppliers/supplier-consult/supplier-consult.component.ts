import { HttpClient } from '@angular/common/http';
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
  urlapi: string = "http://localhost:8081/api/suppliers";
  cont:any;
  nitsearch!: string;
  contenido: any;
  codeget:any;
  searchSupplier() {
      this.res = this.objetohttp.get(this.urlapi + "/nit/" + this.nitsearch);
      this.res.subscribe((datos: any[]) => {
        this.contenido = datos;

      });
    }
}
