import { ChangeDetectionStrategy, Component, ContentChild, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatError, MatFormField } from '@angular/material/form-field';
import { filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomErrorTranslationToken, TranslationToken } from './custom-error-translation.token';
import { errorList } from './error-list';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * instead of
 *  <mat-error *ngIf"signUpForm.get('promoCode').hasError('patter')">Some error text</mat-error>
 *  <mat-error *ngIf"signUpForm.get('promoCode').hasError('maxlenth')">Some maxlength error text</mat-error>
 *  <mat-error *ngIf"signUpForm.get('promoCode').hasError('minlength')">Some minlength error text</mat-error>
 *
 * now you can use
 * <mat-error app-control-error></mat-error>
 *
 * some error messages preset in translation files (route: ./error-list)
 * if you want to add custom error or override existed, you can use DI token CustomErrorTranslationToken
 * example
 * { provide: CustomErrorTranslationToken, useValue: { maxlength: 'Super new error message' } }
 * */

@UntilDestroy()
@Component({
  selector: 'mat-error [app-control-error]',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent implements OnInit, OnDestroy {
  @ContentChild(MatError) matError!: MatError;
  message$?: Observable<string>;
  constructor(
    private field: MatFormField,
    @Optional() @Inject(CustomErrorTranslationToken) private errorList: TranslationToken
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    const ngControl = this.field._control?.ngControl;
    if (!ngControl) {
      throw `Field must contain control got ${ngControl}`;
    }
    const statusChanged = ngControl.statusChanges;
    if (!statusChanged) {
      throw `Control in ${this.constructor.name} does not exist got ${statusChanged}`;
    }
    /** workaround to show error on first change */
    statusChanged.pipe(untilDestroyed(this), take(1)).subscribe(() => ngControl.control?.markAsTouched());
    this.message$ = statusChanged?.pipe(
      untilDestroyed(this),
      map(() => Object.keys(this.field._control.ngControl?.errors ?? {})[0]),
      filter((value: string): value is string => !!value),
      map(error => this.errorList?.[error] ?? errorList[error]),
    );
  }
}
