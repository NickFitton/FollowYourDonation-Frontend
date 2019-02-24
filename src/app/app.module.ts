import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {CharityComponent} from './pages/charity/charity.component';
import {RegisterComponent} from './pages/register/register.component';
import {InvoiceComponent} from './pages/invoice/invoice.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MaterialModule} from './shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SearchComponent } from './pages/search/search.component';
import { DonationsComponent } from './pages/donations/donations.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {GestureConfig} from '@angular/material';
import { PaymentDialogComponent } from './shared/payment-dialog/payment-dialog.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CharityComponent,
        RegisterComponent,
        InvoiceComponent,
        DashboardComponent,
        SearchComponent,
        DonationsComponent,
        PaymentDialogComponent,
    ],
    entryComponents: [
        PaymentDialogComponent
    ],
    imports: [
        MaterialModule,
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
