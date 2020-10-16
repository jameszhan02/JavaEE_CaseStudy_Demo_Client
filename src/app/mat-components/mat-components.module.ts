import { NgModule } from '@angular/core';
// added imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';

const MaterialComponents = [MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule
];
@NgModule({
    imports: [MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule
    ],
    exports: [MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule
    ]
})
export class MatComponentsModule { }