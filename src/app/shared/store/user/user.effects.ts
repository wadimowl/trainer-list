import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { catchError, delay, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AppUserApiService } from '../../../services/main-api/users/users.service';
import { of } from 'rxjs';
import { UserFacade } from './user.facade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterProcessingFacade } from '../router-customize/router-processing.facade';
import { DataToUpdateUser } from '../../../services/main-api/users/users.types';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private appUserApi: AppUserApiService,
    private userModerateFacade: UserFacade,
    private routerProcessingFacade: RouterProcessingFacade,
    private snackBar: MatSnackBar,
  ) {
  }

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUserForModeration),
      switchMap(() => this.appUserApi.fetchUserToModerate().pipe(
        takeUntil(this.actions$.pipe(ofType(UserActions.fetchUser.cancel))),
        map(user => UserActions.fetchUser.processed({ user })),
        catchError(error => of(UserActions.fetchUser.fail(error))),
      )),
    )
  );

  fetchUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUserById),
      switchMap(({ id }) => this.appUserApi.getById(id).pipe(
        delay(500),
        takeUntil(this.actions$.pipe(ofType(UserActions.fetchUser.cancel))),
        map(user => UserActions.fetchUser.processed({ user })),
        catchError(error => of(UserActions.fetchUser.fail(error))),
      )),
    )
  );

  updateUserData = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.changeUserProperty.processing),
      withLatestFrom(this.userModerateFacade.user$),
      switchMap(([{ property, value }, user]) => {
          return this.appUserApi.updateUser({ id: user!._id, [property]: value } as DataToUpdateUser).pipe(
            delay(500),
            map(() => UserActions.changeUserProperty.processed({ property })),
            catchError(error => of(UserActions.changeUserProperty.fail(error))),
          );
        }
      )
    )
  );

  updateUserImagesContent = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.changeUserProperty.approveProcessing),
      withLatestFrom(this.userModerateFacade.user$),
      switchMap(([{ property, value }, user]) => {
        const request = property === 'photos' ? this.appUserApi.updatePhoto : this.appUserApi.updateCertificate;
          return request.call(this.appUserApi, value.id, user!._id, value.status).pipe(
            map(() => UserActions.changeUserProperty.processed({ property })),
            catchError(error => of(UserActions.changeUserProperty.fail(error))),
          );
        }
      )
    )
  );

  catchErrorEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.fetchUser.fail),
      withLatestFrom(this.userModerateFacade.lackOfUserForModeration$),
      filter(([_, lackOfUserForModeration]) => !lackOfUserForModeration),
      tap(() => {
        this.snackBar.open('Server is down', 'Ok');
      }),
    )
  }, { dispatch: false });

  showRouteLoader$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.fetchUserForModeration),
      tap(() => {
        this.routerProcessingFacade.showRouteLoader();
      }),
    )
  }, { dispatch: false });

  hideRouteLoader$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        UserActions.fetchUser.processed,
        UserActions.fetchUser.fail,
      ),
      tap(() => {
        this.routerProcessingFacade.hideRouteLoader();
      }),
    )
  }, { dispatch: false });
}
