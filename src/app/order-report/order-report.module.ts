import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { OrderGeneratorComponent } from './report/order-generator.component';
import { OrderViewerComponent } from './viewer/order-viewer.component';


@NgModule({
  declarations: [OrderGeneratorComponent, OrderViewerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatComponentsModule
  ]
})
export class OrderReportModule { }
