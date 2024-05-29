import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrl: './supplier-create.component.css'
})
export class SupplierCreateComponent implements OnInit {

  constructor(private objetohttp: HttpClient) { }


  res: any;
  contenido: any;
  urlapi: string = "https://shop-service-client-provider.onrender.com/api/suppliers";

  nitinsert!: string;
  direccioninsert!: string;
  emailinsert!: string;
  nombreinsert!: string;
  telefonoinsert!: string;
  codepost!: number;

  insertSupplier() {
    if(!this.nitinsert || !this.direccioninsert || !this.emailinsert || !this.nombreinsert || !this.telefonoinsert){
      this.codepost = 400;
    }else{
      
      this.objetohttp.post(this.urlapi, {
        "nit": this.nitinsert,
        "namesupplier": this.nombreinsert,
        "address": this.direccioninsert,
        "email": this.emailinsert,
        "phone": this.telefonoinsert
      }, {
        observe: 'response'
      }).subscribe(
        response => {
          this.codepost = response.status;
          this.nitinsert = "";
          this.nombreinsert = "";
          this.direccioninsert = "";
          this.emailinsert = "";
          this.telefonoinsert = "";
        }
      )
    }    

  }
  ngOnInit(): void {
  }

}
