import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-delete',
  templateUrl: './supplier-delete.component.html',
  styleUrl: './supplier-delete.component.css'
})
export class SupplierDeleteComponent implements OnInit {

  constructor(private objetohttp: HttpClient) { }

  ngOnInit(): void {
  }
  urlapi: string = "https://shop-service-client-provider.onrender.com/api/suppliers";
  nitdelete!: string;
  codedelete!: number;
  deleteSupplier() {
    this.objetohttp.delete(this.urlapi + "/nit/" + this.nitdelete, {
      observe: 'response'
    }).subscribe(
      (response: any) => {

        this.codedelete = response.status;
        this.nitdelete = "";
      }
    );
  }

}
