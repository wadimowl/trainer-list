import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalImageComponent } from './approval-image.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerModule } from '@shared/components/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
    SpinnerModule,
  ],
  exports: [
    ApprovalImageComponent,
  ],
  declarations: [ApprovalImageComponent],
})
export class ApprovalImageModule { }
