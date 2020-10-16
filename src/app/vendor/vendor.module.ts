import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorListComponent } from './vendor-list.component';

// added imports
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { VendorHomeComponent } from './vendor-home.component';
import { VendorDetailComponent } from './vendor-detail.component';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VendorListComponent, VendorHomeComponent, VendorDetailComponent],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule
  ]
})
export class VendorModule { }
