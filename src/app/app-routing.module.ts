import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home.component';
import { ProductHomeComponent } from './product/product-home.component';
import { OrderGeneratorComponent } from './order-report/order-generator.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vendors', component: VendorHomeComponent },
  { path: '', component: HomeComponent },
  { path: 'products' , component: ProductHomeComponent},
  { path: 'generator', component: OrderGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
