import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  code: number;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {

  ngOnInit(): void {
    this.getConsecutivo();
    this.clientedata = { "nameClient": "" };
    
  }

  constructor(private clientehttp: HttpClient) { }

  apiURL: string = "http://localhost:8082/api/";
  apiURLClient: string = "http://localhost:8081/api/";
  apiURLProduct: string = "http://localhost:8080/api/";
  apiURLConsolidated: string = "http://localhost:8085/api/";

  consecutivo !: any;

  getConsecutivo() {
    this.clientehttp.get(this.apiURL + "sales/consecutive").subscribe((data) => {
      this.consecutivo = data;
      this.consecutivo++;
    }
    )
  }





  

  cedulacliente!: any;
  clientedata: any;
  getCliente() {
    this.clientehttp.get(this.apiURLClient + "clients/identification/" + this.cedulacliente).subscribe((data) => {
      this.clientedata = data;
    }
    )
  }


  productsData: any []= [];
  getProduct(index: number) {
    const cod = this.addProducts[index].code;
    if (cod) {
      this.clientehttp.get(this.apiURLProduct + "products/code/" + cod)
        .subscribe((data: any) => {
          const productData = data[0];
          this.addProducts[index].name = productData.name;
          this.addProducts[index].price = productData.saleprice;
        });
    }

  }

  calcPrice(product: any) {
    const quantity = product.quant;
  const price = product.price;
  if (price>0 && quantity>0) {
    product.price = quantity * price;
  } else {
    product.price = 0;
  }
  }

  addProducts: any []=[];
  addLine(){
    this.addProducts.push({
      code: 0,
      name: "",
      quant: 0,
      price:0
    })
  }

  removeLine(){
    if (this.addProducts.length > 1) {
      this.addProducts.pop();
    }
  }


  totalsale: number = 0;
  totalSale(){
    let total = 0;
    for (let producto of this.addProducts) {
        total += producto.price;
    }
    this.totalsale = total
    return total;
  }

  totaliva:number=0;
  totalIva(): number {
    this.totaliva = this.totalsale * 0.19
    return Number(this.totaliva.toFixed(2));
  }

  totalplusiva: number=0;
  totalPlusIva(){
    this.totalplusiva = this.totalsale + this.totaliva
    return this.totalplusiva;
  }


  reload() {
    window.location.reload()
  }

  city:any;
  codeResponse:any;
  postVenta() { 
    this.clientehttp.post(this.apiURL + "sales",
     {
      "city": this.city,
       "identification": this.cedulacliente,
       "salecode": this.consecutivo,
       "saledetail": this.addProducts,
       "ivasale": this.totaliva,
       "salevalue": this.totalsale,
       "totalsale": this.totalplusiva
     }, {
     observe: 'response'
   }).subscribe(
     (response: any) => {

       this.codeResponse = response.status;
   }
  )}







}




/*product1: any;
product2: any;
product3: any;
codprod1: any;
codprod2: any;
codprod3: any;
getProducto(numproducto: number) {
  switch (numproducto) {
    case 1:
      this.clientehttp.get(this.apiURLProduct + "products/code/" + this.codprod1)
        .subscribe((data) => {
          this.product1 = data;
        });
      break;
    case 2:
      this.clientehttp.get(this.apiURLProduct + "products/code/" + this.codprod2)
        .subscribe((data) => {
          this.product2 = data;
        });
      break;
    case 3:
      this.clientehttp.get(this.apiURLProduct + "products/code/" + this.codprod3)
        .subscribe((data) => {
          this.product3 = data;
        });
      break;

    default:
      break;
  }
}*/

/* precioprod1: any;
 cant1: any;
 precioprod2: any;
 cant2: any;
 precioprod3: any;
 cant3: any;
 calcPrecioProd(numproducto: number) {
   switch (numproducto) {
     case 1:
       this.precioprod1 = this.cant1 * this.product1[0].saleprice;
       break;
     case 2:
       this.precioprod2 = this.cant2 * this.product2[0].saleprice;
       break;
     case 3:
       this.precioprod3 = this.cant3 * this.product3[0].saleprice;
       break;

     default:
       break;
   };
   this.calcularTotales();
 }
 totalventa: number = 0.0;
 totalplusiva: number = 0.0;
 totaliva: number = 0.0;
 calcularTotales() {
   this.totalventa = 0.0;
   if (this.precioprod1 != null && this.precioprod1 != undefined
     && this.precioprod1 != "") {
     this.totalventa += this.precioprod1;
     this.totaliva = (this.totalventa) * 0.19;
     this.totalplusiva = this.totalventa + ((this.totalventa) * 0.19);

   }
   if (this.precioprod2 != null && this.precioprod2 != undefined
     && this.precioprod2 != "") {
     this.totalventa += this.precioprod2;
     this.totaliva = (this.totalventa) * 0.19;
     this.totalplusiva = this.totalventa + ((this.totalventa) * 0.19);

   }
   if (this.precioprod3 != null && this.precioprod3 != undefined
     && this.precioprod3 != "") {
     this.totalventa += this.precioprod3;
     this.totaliva = (this.totalventa) * 0.19;
     this.totalplusiva = this.totalventa + ((this.totalventa) * 0.19);

   }

 }

 codigorespuesta: any;
 listadetalleventa = Array();
 ciudad: any;
 postVenta() {
   if (this.precioprod1 != null && this.precioprod1 != undefined && this.precioprod1 != "") {
     let aux = {
       "productquantity": this.cant1,
       "codeproduct": this.codprod1,
       "ivavalue": this.precioprod1 * 0.19,
       "totalsale": this.precioprod1,
       "salevalue": (this.precioprod1 * 0.19) + this.precioprod1
     }
     this.listadetalleventa.push(aux);

   }
   if (this.precioprod2 != null && this.precioprod2 != undefined && this.precioprod2 != "") {
     let aux = {
       "productquantity": this.cant2,
       "codeproduct": this.codprod2,
       "ivavalue": this.precioprod2 * 0.19,
       "totalsale": this.precioprod2,
       "salevalue": (this.precioprod2 * 0.19) + this.precioprod2
     }
     this.listadetalleventa.push(aux);

   }
   if (this.precioprod3 != null && this.precioprod3 != undefined && this.precioprod3 != "") {
     let aux = {
       "productquantity": this.cant3,
       "codeproduct": this.codprod3,
       "ivavalue": this.precioprod3 * 0.19,
       "totalsale": this.precioprod3,
       "salevalue": (this.precioprod3 * 0.19) + this.precioprod3
     }
     this.listadetalleventa.push(aux);

   }
   this.clientehttp.post(this.apiURL + "sales",
     {
       "identification": this.cedulacliente,
       "salecode": this.consecutivo,
       "saledetail": this.listadetalleventa,
       "ivasale": this.totaliva,
       "totalsale": this.totalplusiva,
       "salevalue": this.totalventa
     }, {
     observe: 'response'
   }).subscribe(
     (response: any) => {

       this.codigorespuesta = response.status;

       switch (this.codigorespuesta) {
         case 0:
           console.log(this.codigorespuesta);
           /*this.showNotification('top', 'right', 1);*/
/*   break;
 case 201:
   this.postConsolidado();
   /*this.showNotification('top', 'right', 1);*/
/*break;

case 226:
console.log(this.codigorespuesta);
/* this.showNotification('top', 'right', 2);*/
/*break;

case 500:
console.log(this.codigorespuesta);
/* this.showNotification('top', 'right', 3);*/
/*break;

}

}
);


}
/* postConsolidado() {
console.log(this.ciudad)
console.log(typeof this.ciudad)
this.clientehttp.post(this.apiURLConsolidated + "consolidated/agregar/"+this.ciudad, 
{},
{observe:"response"}
).subscribe((response: any) => {

console.log(response.status)

});
}*/







