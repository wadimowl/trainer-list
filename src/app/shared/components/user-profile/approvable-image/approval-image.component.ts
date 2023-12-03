import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApprovalImagePreviewComponent } from './approvable-image-preview/approval-image-preview.component';
import { APPROVE_STATE, ProvableImage } from '../../../../services/main-api/users/users.types';
import { Icon } from './approval-image.types';

@Component({
  selector: 'app-approval-image',
  templateUrl: './approval-image.component.html',
  styleUrls: ['./approval-image.component.scss'],
})
export class ApprovalImageComponent {
  constructor(private dialog: MatDialog) {
  }
  private _content?: ProvableImage;
  get content(): ProvableImage | undefined {
    return this._content;
  }

  @Input()
  set content(content: ProvableImage | undefined) {
    this._content = content;
    this.icon = this.content ? getIcon(this.content.approved) : undefined;
  }

  @Output()
  readonly onChange = new EventEmitter<APPROVE_STATE>();

  icon?: Icon;
  readonly approveState = APPROVE_STATE;

  showFullSize(): void {
    if (!this.content) {
      return;
    }
    this.dialog.open(ApprovalImagePreviewComponent, {
      data: { url: this.content.url },
    });
  }

  onClick(approve: boolean = true): void {
    const param = approve ? APPROVE_STATE.ACCEPT : APPROVE_STATE.DECLINE;
    this.onChange.emit(param);
  }
}

function getIcon(type: APPROVE_STATE): Icon | undefined {
  switch (type) {
    case APPROVE_STATE.ACCEPT:
      return { content: 'done', color: 'primary' };
    case APPROVE_STATE.DECLINE:
      return { content: 'close', color: 'warn' };
    default:
      return undefined;
  }
}
