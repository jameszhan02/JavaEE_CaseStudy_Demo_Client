import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home.component';
import { ProductHomeComponent } from './product/product-home.component';
import { OrderGeneratorComponent } from './order-report/report/order-generator.component';
import { OrderViewerComponent } from './order-report/viewer/order-viewer.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vendors', component: VendorHomeComponent },
  { path: '', component: HomeComponent },
  { path: 'products' , component: ProductHomeComponent},
  { path: 'generator', component: OrderGeneratorComponent },
  { path: 'viewer', component: OrderViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
