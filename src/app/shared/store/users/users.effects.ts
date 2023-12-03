import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersAction } from './users.actions';
import { catchError, delay, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppUserApiService } from '../../../services/main-api/users/users.service';
import { UsersFacade } from './users.facade';
import { RouterProcessingFacade } from '@shared/store/router-customize/router-processing.facade';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UsersAction.fetchUsers.processing),
    withLatestFrom(this.usersFacade.usersData$),
    switchMap(([_, { pagination, role }]) => this.userApi.list({ perPage: pagination.perPage, page: pagination.page }, role)
      .pipe(
        delay(500),
        map(({ users, pagination }) => UsersAction.fetchUsers.processed({ users, total: pagination.total })))),
        catchError(error => of(UsersAction.fetchUsers.fail(error))),
  ))

  onUsersListParamsChange$ = createEffect(() => this.actions$.pipe(
    ofType(UsersAction.fetchUsers.setPage, UsersAction.fetchUsers.sortByRole),
    map(UsersAction.fetchUsers.processing),
  ));

  showRouteLoader$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersAction.fetchUsers.processing),
      tap(() => {
        this.routerProcessingFacade.showRouteLoader();
      }),
    )
  }, { dispatch: false });

  hideRouteLoader$ = createEffect(() => this.actions$.pipe(
    ofType(UsersAction.fetchUsers.processed, UsersAction.fetchUsers.fail),
    tap(() => {
      this.routerProcessingFacade.hideRouteLoader();
    }),
  ), { dispatch: false });

  constructor(private actions$: Actions, private userApi: AppUserApiService, private usersFacade: UsersFacade, private routerProcessingFacade: RouterProcessingFacade,) {
  }
}

