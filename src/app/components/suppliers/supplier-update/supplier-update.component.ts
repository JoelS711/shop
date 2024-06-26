import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrl: './supplier-update.component.css'
})
export class SupplierUpdateComponent implements OnInit {

  constructor(private objetohttp: HttpClient) { }

  ngOnInit(): void {
  }
  res: any;
  contenido: any;
  urlapi: string = "https://shop-service-client-provider.onrender.com/api/suppliers";

  nitupdate!: string;
  direccionupdate!: string;
  emailupdate!: string;
  nombreupdate!: string;
  telefonoupdate!: string;
  codeput!: number;
  updateSupplier() {
    if(!this.nitupdate || !this.direccionupdate || !this.emailupdate || !this.nombreupdate || !this.telefonoupdate){
      this.codeput = 400;
    }else{
      this.objetohttp.put(this.urlapi + "/nit/" + this.nitupdate,
        {
          "nit": this.nitupdate,
          "address": this.direccionupdate,
          "email": this.emailupdate,
          "namesupplier": this.nombreupdate,
          "phone": this.telefonoupdate
        }, {
        observe: 'response'
      }).subscribe(
        (response: any) => {
  
          this.codeput = response.status;
          this.nitupdate = "";
          this.direccionupdate = "";
          this.emailupdate = "";
          this.nombreupdate = "";
          this.telefonoupdate = "";
        }
      );
    }

    }

}
