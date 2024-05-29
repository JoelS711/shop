import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private objetohttp: HttpClient,private principalservice:ProductsService) { }

  //variable receptora de documentos
  res: any;
  //variable contenedora de contenidos
  contenido: any;
  //url api get
  urlapiGET: string = "https://shop-service-products.onrender.com/api/products";

 



  ///////////////// METODOS ANGULAR /////////////////////////////

  //FUNCIÓN DE EJECUCIÓN ANTES DE LA CARGA DE LA PAGINA
  ngOnInit(): void {

    this.res = this.objetohttp.get(this.urlapiGET);
    //suscribe el archivo json y lo convierte   
    this.res.subscribe((datos: any[]) => {
      this.contenido = datos;
    });
  }




  res2: any;

  resultados:any;
  file!:File;
//Solo se dejara guardar un archivo y si el archivo no es, se puede volver a cargar el nuevo en memoria y se elimina el viejo
  onChange(event:any){
    this.file=event.target.files[0];
  } 

  async onUpload(){
    this.principalservice.deleteProduct();
    this.resultados= await this.principalservice.upload(this.file);
  }
}
