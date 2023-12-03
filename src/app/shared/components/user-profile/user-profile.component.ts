import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APPROVE_STATE, Trainer, USER_STATUS } from '../../../services/main-api/users/users.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserChangeEvent, VISUAL_CONTENT } from './user-profile.types';
import { EMPTY_PROFILE_USER } from './empty-profile-user';
import { debounceTime, filter } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";

const statusFieldName = 'status';

@UntilDestroy()
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnDestroy {
  private localUser: Trainer | null = null;

  @Input()
  set user(user: Trainer | null) {
    this.localUser = user;
    if (user) {
      this.form.patchValue(user, { emitEvent: false });
    }
  }

  @Input() load = false;
  @Input() fieldLoaders: Set<keyof Trainer> = new Set;

  @Output() onChange = new EventEmitter<UserChangeEvent>();

  /** Pass enums */
  readonly STATUSES = USER_STATUS;

  readonly form = this.formBuilder.group({
    name: [EMPTY_PROFILE_USER.name, [Validators.minLength(2), Validators.maxLength(40), Validators.required]],
    email: [EMPTY_PROFILE_USER.email, [Validators.email]],
    about: [EMPTY_PROFILE_USER.about, [Validators.minLength(2), Validators.maxLength(200)]],
    phone: [{ value: EMPTY_PROFILE_USER.phone, disabled: true }],
    role: [{ value: EMPTY_PROFILE_USER.role, disabled: true }],
    [statusFieldName]: [EMPTY_PROFILE_USER.status],
  });

  get user(): Trainer | null {
    return this.localUser;
  }

  readonly approveEvents = {
    photos: this.approveContent.bind(this, VISUAL_CONTENT.PHOTO),
    certificates: this.approveContent.bind(this, VISUAL_CONTENT.CERTIFICATES),
  };

  readonly statusList = Object.values(USER_STATUS).filter(value => typeof value === 'string');

  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    Object.entries(this.form.controls)
      .filter(([name, control]) => name !== statusFieldName && !control.disabled)
      .forEach(([property, control]) => {
        control.valueChanges.pipe(
          untilDestroyed(this),
          debounceTime(1000),
          filter(() => control.valid),
        ).subscribe(value => {
          this.onChange.emit({ property: property as keyof Trainer, value: value ?? null });
        });
      });

    this.form.controls[statusFieldName].valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.snackBar.open('Status-change will be not saved on server.', 'Ok');
    });
  }

  ngOnDestroy(): void {}

  private approveContent(contentType: VISUAL_CONTENT, status: APPROVE_STATE, index: number): void {
    this.onChange.emit({ property: contentType, value: { id: index, status } });
  }
}
