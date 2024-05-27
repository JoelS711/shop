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
            contenido = contenido.replace(/;/g, ',');
            let lineas_separadas=contenido.split("\n");
            lineas_separadas.shift();

            for (let linea_actual of lineas_separadas){
              linea_actual = linea_actual.trim();
              if(linea_actual){
                let columnas = linea_actual.split(",");
                if(columnas.length === 6){
                  let product = {
                    code: parseInt(columnas[0].trim(), 10),
                    name: columnas[3].trim(),
                    nitprovider: parseInt(columnas[1].trim(), 10),
                    purchaseprice: parseFloat(columnas[4].trim()),
                    iva: parseFloat(columnas[2].trim()),
                    saleprice: parseFloat(columnas[5].trim())
                  };
  
                  console.log('Enviando producto:', product);
                  this.httpobject.post(this.apiURL,product,{
                    observe:'response'
                  }).subscribe(
                    (response:any)=>{
                      this.resultados.push(response.status);
                    }
                  );
                }
              }
            }
            resolve(this.resultados);
          }
          lector.readAsText(file);
        }
      );
  }
}
