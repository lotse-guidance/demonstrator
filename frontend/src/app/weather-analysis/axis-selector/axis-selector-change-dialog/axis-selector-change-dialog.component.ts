import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'gs-axis-selector-change-dialog',
  templateUrl: './axis-selector-change-dialog.component.html',
  styleUrls: ['./axis-selector-change-dialog.component.scss']
})
export class AxisSelectorChangeDialogComponent {

  constructor(private dialogRef: MatDialogRef<AxisSelectorChangeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AxisSelectorChangeDialogData) { }

  change(): void {
    this.data.action = 'change';
    this.dialogRef.close(this.data);
  }
}

export interface AxisSelectorChangeDialogData {
  action: 'change';
}
