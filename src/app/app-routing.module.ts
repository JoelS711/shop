import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SalesComponent } from './components/sales/sales.component';
import { HomeComponent } from './components/home/home.component';
import { ClientConsultComponent } from './components/clients/client-consult/client-consult.component';
import { ClientCreateComponent } from './components/clients/client-create/client-create.component';
import { ClientUpdateComponent } from './components/clients/client-update/client-update.component';
import { ClientDeleteComponent } from './components/clients/client-delete/client-delete.component';
import { ProductsComponent } from './components/products/products.component';
import { SupplierDeleteComponent } from './components/suppliers/supplier-delete/supplier-delete.component';
import { SupplierConsultComponent } from './components/suppliers/supplier-consult/supplier-consult.component';
import { SupplierCreateComponent } from './components/suppliers/supplier-create/supplier-create.component';
import { SupplierUpdateComponent } from './components/suppliers/supplier-update/supplier-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'client-consult', component: ClientConsultComponent },
  { path: 'client-create', component: ClientCreateComponent },
  { path: 'client-update', component: ClientUpdateComponent },
  { path: 'client-delete', component: ClientDeleteComponent },
  { path: 'supplier-consult', component: SupplierConsultComponent},
  { path: 'supplier-create', component: SupplierCreateComponent },
  { path: 'supplier-update', component: SupplierUpdateComponent },
  { path: 'supplier-delete', component: SupplierDeleteComponent },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rountingComponents = [LoginComponent, SalesComponent, HomeComponent, ClientConsultComponent, ClientCreateComponent, ClientUpdateComponent, 
  ClientDeleteComponent, ClientDeleteComponent, ProductsComponent,
SupplierConsultComponent, SupplierCreateComponent, SupplierUpdateComponent, SupplierDeleteComponent]
