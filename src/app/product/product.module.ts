import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHomeComponent } from './product-home.component';

import { MatComponentsModule } from '../mat-components/mat-components.module';
import {  ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail.component';



@NgModule({
  declarations: [ProductHomeComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
