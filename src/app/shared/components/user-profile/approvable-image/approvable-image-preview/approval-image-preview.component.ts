import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './approval-image-preview.component.html',
  styleUrls: ['./approval-image-preview.component.scss'],
})
export class ApprovalImagePreviewComponent {
  constructor(
    private dialogRef: MatDialogRef<ApprovalImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string }
    ) {
  }

  onClick(): void {
    this.dialogRef.close();
  }
}
