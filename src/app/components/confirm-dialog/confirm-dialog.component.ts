import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

    @Output() submitClicked = new EventEmitter<any>();

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
    }

    onNoClick() {
        this.data.isConfirm = false;
        this.submitClicked.emit(this.data);
        this.dialogRef.close();
    }

    onYesClick() {
        this.data.isConfirm = true;
        this.submitClicked.emit(this.data);
        this.dialogRef.close();
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
