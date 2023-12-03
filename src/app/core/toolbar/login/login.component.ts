import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { ServerError } from '../../../services/main-api/server-errors/server-base.error';
import { CurrentUserSessionFacade } from '@shared/store/current-user-session/current-user-session.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from '../../../../environments/environment';
import { FormErrors, serverErrorsBindings } from "./login.component.types";

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  /** template bindings */
  readonly processing$ = this.currentUserFacade.selectUserProcessingStatus$;

  readonly form = this.formBuilder.group({
    login: [environment.adminCredentials.login, [Validators.required, Validators.minLength(3), Validators.email]],
    password: [environment.adminCredentials.pass, [Validators.minLength(3), Validators.required]],
  });
  private controlsSubscription: Subscription | null = null;

  constructor(private formBuilder: FormBuilder, private currentUserFacade: CurrentUserSessionFacade,
              private dialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit(): void {
    this.currentUserFacade.selectUserError$
      .pipe(
        untilDestroyed(this),
        filter(error => !!error),
      )
      .subscribe((error) => {
        const errorType = serverErrorsBindings.find(([errorConstructor]) => {
          return ServerError.tryCastToServerErrorAndCompare(errorConstructor, error!);
        })?.[1] || FormErrors.DEFAULT;
        this.form.controls.login.setErrors({ [errorType]: true });
        if (errorType === FormErrors.WRONG_EMAILS_OR_PASSWORD) {
          this.form.controls.password.setErrors({ [errorType]: true });
          this.resetValidationOnNextInput();
        }
      });

    this.currentUserFacade.selectUserEmail$
      .pipe(untilDestroyed(this), filter(email => !!email), take(1))
      .subscribe(() => this.dialogRef.close());
  }

  ngOnDestroy() {
  }

  login() {
    const { login, password } = this.form.controls;
    this.currentUserFacade.login(login.value, password.value);
  }

  loginAsAdmin() {
    this.form.updateValueAndValidity();
    this.form.setValue({ login: environment.adminCredentials.login, password: environment.adminCredentials.pass });
    this.login();
  }

  private resetValidationOnNextInput() {
    if (this.controlsSubscription && !this.controlsSubscription.closed) {
      return;
    }
    this.controlsSubscription = this.form.valueChanges
      .pipe(untilDestroyed(this), take(1))
      .subscribe(() => {
        const controls = Object.values(this.form.controls);
        [...controls, this.form].forEach(control => control.updateValueAndValidity({ onlySelf: true }));
      });
  }
}
