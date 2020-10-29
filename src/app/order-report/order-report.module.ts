import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { OrderGeneratorComponent } from './order-generator.component';


@NgModule({
  declarations: [OrderGeneratorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatComponentsModule
  ]
})
export class OrderReportModule { }
