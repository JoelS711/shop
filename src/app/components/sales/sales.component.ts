import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  code: number;
  name: string;
  quantity: number;
  price: number;
  originalPrice: number;
  totalPrice: number;
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
  apiURLReport: string = "http://localhost:8086/api/";

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
          this.addProducts[index].originalPrice = productData.saleprice;
          this.calcPrice(index);
        });
    }

  }

  calcPrice(index: number) {
const products = this.addProducts[index];
const quant = products.quant;
const price = products.originalPrice;
console.log("Cantidad antes del if "+quant);
console.log("Precio antes del if "+price);
if (!isNaN(quant) && quant > 0) {
  let totalPrice = quant * price;
console.log("Cantidad antes del if "+quant);
console.log("Precio antes del if "+price);
products.totalPrice =  totalPrice;
/*this.salesDetail.push({
  "productquantity": quant,
  "codeproduct": products.code,
  "ivavalue": products.price * 0.19,
  "totalsale": products.price,
  "salevalue": (products.price * 0.19) + products.price
});*/
}else{
  
console.log("Cantidad antes del if "+quant);
console.log("Precio antes del if "+price);
  products.price =0;
}

this.updateSalesDetail();

  /*const quantity = product.quant;
  const price = product.price;
  const p = product.price;
console.log("Cantidad antes del if "+quantity);
console.log("Precio antes del if "+price);
  if (!isNaN(quantity) && price !== null && price !== undefined && price > 0) { // Verificar si la cantidad es un número válido y el precio es mayor que cero
    product.price = quantity * price;
    console.log("Despues del if "+quantity);
console.log("Despues del if "+price);
console.log("Despues del if "+product.price);
    this.salesDetail.push({
      "productquantity": quantity,
      "codeproduct": product.code,
      "ivavalue": product.price * 0.19,
      "totalsale": product.price,
      "salevalue": (product.price * 0.19) + product.price
    });
  } else {
    console.log("else "+quantity);
console.log("else "+price);
console.log("else "+product.price);
  }
    /*const quantity = parseFloat(product.quant) || 0;
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
  }*/
  }


  updateSalesDetail() {
    this.salesDetail = this.addProducts.map(product => ({
      productquantity: product.quant,
      codeproduct: product.code,
      ivavalue: product.totalPrice * 0.19,
      totalsale: product.totalPrice,
      salevalue: product.totalPrice * 1.19
    }));

    this.totalSale();
    this.totalIva();
    this.totalPlusIva();
  }

  addProducts: any []=[];
  addLine(){
    this.addProducts.push({
      code: 0,
      name: "",
      quant: 0,
      price:0,
      originalPrice: 0,
      totalPrice: 0
    })
  }

  salesDetail: any []=[]

  removeLine(){
    if (this.addProducts.length > 1) {
      this.addProducts.pop();
      this.updateSalesDetail();
    }
  }


  totalsale: number = 0;
  totalSale(){
    let total = 0;
    for (let producto of this.addProducts) {
        total += producto.totalPrice;
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


  validateForm(): boolean {
    this.submitted = true;
    if (!this.city || !this.cedulacliente || this.addProducts.some(prod => !prod.code || !prod.quant)) {
      return false;
    }
    return true;
  }

  submitted:boolean=false;
  codeResponse:any;
  postVenta() { 
      if(this.validateForm()){
        this.clientehttp.post(this.apiURL + "sales",
        {
         "city": this.city,
          "identification": this.cedulacliente,
          "name": this.clientedata.name,
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
      })
      this.consolidated();
      this.report();
     
      
      }
     
    
    
  }

 


  city:any;
  respConsolidate:any;
  consolidated(){
    this.clientehttp.post(this.apiURLConsolidated + "consolidated", {
      "city": this.city,
      "iva": this.totaliva,
      "totalsale": this.totalsale,
      "total": this.totalplusiva
    }, {
      observe: 'response'
    }).subscribe(
      response => {
        this.respConsolidate = response.status;
            }
    )
  }

  respReport:any;
  report(){
    this.clientehttp.post(this.apiURLReport + "report", {
      "city": this.city,
      "identification":this.cedulacliente,
      "name": this.clientedata.name,
      "total": this.totalplusiva
    }, {
      observe: 'response'
    }).subscribe(
      response => {
        this.respReport = response.status;
            }
    )
  }



}







