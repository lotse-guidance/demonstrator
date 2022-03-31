import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { D3BrushEvent } from 'd3';

@Component({
  selector: 'gs-brush-dialog',
  templateUrl: './brush-dialog.component.html',
  styleUrls: ['./brush-dialog.component.scss']
})
export class BrushDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BrushDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BrushDialogData) { }

  ngOnInit(): void {
    this.dialogRef.updatePosition({
      top: `${this.data.event.sourceEvent.y}px`,
      left: `${this.data.event.sourceEvent.x}px`,
    });
  }

  zoom(): void {
    this.data.action = 'zoom';
    this.dialogRef.close(this.data);
  }

  highlight(): void {
    this.data.action = 'highlight';
    this.dialogRef.close(this.data);
  }
}

export interface BrushDialogData {
  action?: 'zoom' | 'highlight';
  event: D3BrushEvent<any>;
}
