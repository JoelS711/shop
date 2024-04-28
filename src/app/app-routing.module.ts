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
import { SuppliersComponent } from './components/suppliers/suppliers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'client-consult', component: ClientConsultComponent },
  { path: 'client-create', component: ClientCreateComponent },
  { path: 'client-update', component: ClientUpdateComponent },
  { path: 'client-delete', component: ClientDeleteComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rountingComponents = [LoginComponent, SalesComponent, HomeComponent, ClientConsultComponent, ClientCreateComponent, ClientUpdateComponent, ClientDeleteComponent, ClientDeleteComponent, ProductsComponent]
