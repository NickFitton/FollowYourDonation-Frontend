import {NgModule} from '@angular/core';
import {
    MatButtonModule, MatCardModule, MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSliderModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatSliderModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule
    ],
    exports: [
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatSliderModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule
    ]
})
export class MaterialModule {

}
