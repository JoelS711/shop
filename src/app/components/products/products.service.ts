import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURL:string ="http://localhost:8080/api/products";
  
  constructor(private httpobject:HttpClient) { }

  resultados=Array();


  deleteProduct(){
    this.httpobject.delete(this.apiURL).subscribe(data => {
      console.log(data);
    });
  }

  upload(file:any):Promise<any[]>{
    this.httpobject.delete(this.apiURL);
      return new Promise<any[]>(
        (resolve,reject)=>{
          const lector = new FileReader();
          lector.onloadend=(e)=>{
            let contenido :string = lector.result as string;
            let lineas_separadas=contenido.split("\n");

            for (let linea_actual of lineas_separadas){
              linea_actual.replace(";",",");
              let columnas = linea_actual.split(";");

              this.httpobject.post(this.apiURL,
              {
                "code":columnas[0],
                "name":columnas[1],
                "nitprovider":columnas[2],
                "purchaseprice":columnas[3],
                "iva":columnas[4],
                "saleprice":columnas[5]
              },{
                observe:'response'
              }).subscribe(
                (response:any)=>{
                  this.resultados.push(response.status);
                }
              );
            }
            resolve(this.resultados);
          }
          lector.readAsText(file);
        }
      );
  }
}
