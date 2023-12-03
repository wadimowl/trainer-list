import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers, selectUsersParams, selectUsersState, usersLoading } from './users.selectors';
import { UsersAction } from './users.actions';
import { Observable } from 'rxjs';
import { User } from '../../../services/main-api/users/users.types';
import { UsersParams, UsersState } from './users.reducer';
import { RoleSortOption } from './users.types';

@Injectable()
export class UsersFacade {
  users$: Observable<User[]> = this.store.select(selectAllUsers);
  usersData$: Observable<UsersState> = this.store.select(selectUsersState);
  usersLoading$: Observable<boolean> = this.store.select(usersLoading);
  usersParams$: Observable<UsersParams> = this.store.select(selectUsersParams);

  constructor(private store: Store) {
  }

  fetchUsers() {
    this.store.dispatch(UsersAction.fetchUsers.processing());
  }

  setPage(page: number) {
    this.store.dispatch(UsersAction.fetchUsers.setPage({ page }));
  }

  roleSortingChange(role: RoleSortOption) {
    this.store.dispatch(UsersAction.fetchUsers.sortByRole({ role }));
  }

  cancelUsersFetching() {
    this.store.dispatch(UsersAction.fetchUsers.cancel());
  }
}
