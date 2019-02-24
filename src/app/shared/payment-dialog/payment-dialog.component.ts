import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-payment-dialog',
    templateUrl: './payment-dialog.component.html',
    styleUrls: ['./payment-dialog.component.styl']
})
export class PaymentDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<PaymentDialogComponent>) {

    }

    ngOnInit() {
    }

    closeSuccessfully() {
     this.dialogRef.close();
    }

}
