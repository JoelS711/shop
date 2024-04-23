import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrl: './client-delete.component.css'
})
export class ClientDeleteComponent implements OnInit {

  constructor(private objetohttp: HttpClient) { }

  ngOnInit(): void {
  }
  urlapi: string = "http://localhost:8081/api/clients";
  ceduladelete!: string;
  codedelete!: number;
  eliminarCliente() {
    this.objetohttp.delete(this.urlapi + "/identification/" + this.ceduladelete, {
      observe: 'response'
    }).subscribe(
      (response: any) => {

        this.codedelete = response.status;
        this.ceduladelete = "";
      }
    );
  }

}
