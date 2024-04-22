import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  urlapi: string = "http://localhost:8081/api/clients";
  cont:any;
  cedulasearch!: string;
  contenido: any;
  codeget:any;
  buscarCliente() {
      this.res = this.objetohttp.get(this.urlapi + "/identification/" + this.cedulasearch);
      this.res.subscribe((datos: any[]) => {
        this.contenido = datos;
        console.log(this.contenido)

      });
    }
}
