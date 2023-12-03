import {
  selectIsAuthorize, selectToken,
  selectUserEmail,
  selectUserError,
  selectUserProcessingStatus
} from './current-user-session.selectors';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { currentUserLoginActions, logoutAction } from './current-user-session.actions';

@Injectable()
export class CurrentUserSessionFacade {
  readonly selectUserError$ = this.store.select(selectUserError);
  readonly selectUserEmail$ = this.store.select(selectUserEmail);
  readonly selectIsAuthorize$ = this.store.select(selectIsAuthorize);
  readonly selectToken$ = this.store.select(selectToken);
  readonly selectUserProcessingStatus$ = this.store.select(selectUserProcessingStatus);
  constructor(private store: Store) {}

  login(login: string, password: string): void {
    this.store.dispatch(currentUserLoginActions.processing({ login, password }));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
