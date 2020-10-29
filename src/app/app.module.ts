import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { VendorHomeComponent } from './vendor/vendor-home.component';
import { VendorModule } from "./vendor/vendor.module";
import { ProductModule } from './product/product.module';

// added imports
import { MatComponentsModule } from './mat-components/mat-components.module';
import { HomeComponent } from './home/home.component';
import { OrderReportModule } from './order-report/order-report.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    VendorModule,
    MatComponentsModule,
    HttpClientModule,
    ProductModule,
    OrderReportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
