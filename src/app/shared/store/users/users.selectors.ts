import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';
import { adapter } from './users.reducer';
import { HttpActionState } from '@shared/store/http-meta';

const { selectAll } = adapter.getSelectors();

export const selectUsersState = createFeatureSelector<fromUsers.UsersState>(
  fromUsers.usersFeatureKey
);

export const selectAllUsers = createSelector(selectUsersState, selectAll);
export const usersLoading = createSelector(selectUsersState, ({ meta }) => meta === HttpActionState.Busy);
export const selectUsersParams = createSelector(selectUsersState, ({ pagination, role }) => ({ pagination, role }));
