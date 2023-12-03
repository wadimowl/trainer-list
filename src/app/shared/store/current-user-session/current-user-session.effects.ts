import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppUserApiService } from '../../../services/main-api/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { currentUserLoginActions, logoutAction } from '@shared/store/current-user-session/current-user-session.actions';
import { CurrentUserSessionFacade } from '@shared/store/current-user-session/current-user-session.facade';
import { environment } from '../../../../environments/environment';
import { ROUTES } from '../../../core/app-routing.module';

@Injectable()
export class CurrentUserSessionEffects {
  /** autologin */
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      take(1),
      tap(() => this.currentUserSessionFacade.login(environment.adminCredentials.login, environment.adminCredentials.pass)),
    ), { dispatch: false }
  );
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(currentUserLoginActions.processing),
      switchMap(({ login, password }) =>
        this.authService.login(login, password).pipe(
          map(result => {
            return currentUserLoginActions.processed({ email: login, token: result });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(currentUserLoginActions.fail({ error: error.error }));
          }),
        )
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(logoutAction), tap(() => {
      this.router.navigate([ROUTES.UN_AUTHORISE]).catch(console.log);
    }))
  }, { dispatch: false })

  onLogin$ = createEffect(() => {
    return this.actions$.pipe(ofType(currentUserLoginActions.processed), tap(() => {
      this.router.navigate([ROUTES.DEFAULT]).catch(console.log);
    }))
  }, { dispatch: false })

  constructor(private actions$: Actions, private authService: AppUserApiService,
              private router: Router, private currentUserSessionFacade: CurrentUserSessionFacade) {
  }
}
