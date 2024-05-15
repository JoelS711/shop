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
    this.salesDetail.push({
      "productquantity": quantity,
       "codeproduct": product.code,
       "ivavalue": product.price*0.19,
       "totalsale": product.price,
       "salevalue": (product.price*0.19)+product.price
    })
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

  salesDetail: any []=[]

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
    return Number(this.totalplusiva.toFixed(2));
  }


  reload() {
    window.location.reload()
  }

  city:any;
  codeResponse:any;
  postVenta() { 
    console.log(this.salesDetail)
    this.clientehttp.post(this.apiURL + "sales",
     {
      "city": this.city,
       "identification": this.cedulacliente,
       "salecode": this.consecutivo,
       "saledetail": this.salesDetail,
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







