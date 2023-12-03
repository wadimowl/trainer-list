import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserSelectors } from './user.selectors';
import { filter, map, pairwise, withLatestFrom } from 'rxjs/operators';
import { isUserImageChangeEvent, UserChangeEvent } from '@shared/components/user-profile/user-profile.types';
import { EMPTY_PROFILE_USER } from '@shared/components/user-profile/empty-profile-user';
import { Observable } from 'rxjs';
import { Trainer } from '../../../services/main-api/users/users.types';

@Injectable()
export class UserFacade {
  readonly user$ = this.store.select(UserSelectors.selectUser);
  readonly userOrEmpty$: Observable<Trainer> = this.user$.pipe(
    map(user => {
      const emptyStringInsteadVoid = (v: string | void) => v ?? '';
      return !user
        ? EMPTY_PROFILE_USER
        : { ...user, name: emptyStringInsteadVoid(user.name), about: emptyStringInsteadVoid(user.about), email: emptyStringInsteadVoid(user.email) };
    }),
  );
  readonly selectIsUserLoading$ = this.store.select(UserSelectors.selectUserIsLoading);
  readonly selectIsUserLoaded$ = this.store.select(UserSelectors.selectUserIsLoaded);
  readonly lackOfUserForModeration$ = this.store.select(UserSelectors.lackOfUsers);
  readonly whatPropertiesIsChanging$ = this.store.select(UserSelectors.selectWhatPropertiesIsChanging);
  readonly sameUserRequested$ = this.selectIsUserLoaded$.pipe(
    filter(Boolean),
    withLatestFrom(this.user$),
    pairwise(),
    map(([[_, old], [_x, current]]) => old?._id === current?._id)
  );

  constructor(private store: Store) {}

  requestNextUserForModeration(): void {
    this.store.dispatch(UserActions.fetchUserForModeration());
  }

  cancelNextUserForModerationRequest(): void {
    this.store.dispatch(UserActions.fetchUser.cancel());
  }

  changeUser(event: UserChangeEvent): void {
    if (isUserImageChangeEvent(event)) {
      this.store.dispatch(UserActions.changeUserProperty.approveProcessing(event));
      return;
    }
    this.store.dispatch(UserActions.changeUserProperty.processing(event));
  }

  fetchUserById(id: string) {
    this.store.dispatch(UserActions.fetchUserById({ id }));
  }

  dropUser() {
    this.store.dispatch(UserActions.fetchUser.clear());
  }
}
