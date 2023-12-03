import { UsersAction } from './users.actions';
import { createReducer, on } from '@ngrx/store';
import { User } from '../../../services/main-api/users/users.types';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpActionMetadata, HttpActionState } from '@shared/store/http-meta';
import { Pagination } from '../../../services/main-api/common.interfaces';
import { RoleSortOption } from './users.types';

export const usersFeatureKey = 'users';

export interface UsersParams {
  role: RoleSortOption;
  pagination: Pagination;
}

export interface UsersState extends EntityState<User>, UsersParams {
  meta: HttpActionMetadata;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({ selectId: user => user._id });

export const initialState: UsersState = adapter.getInitialState({
  meta: HttpActionState.Init,
  role: null,
  pagination: { total: 0, page: 1, perPage: 10, pages: 0 },
});

export const reducer = createReducer(
  initialState,
  on(UsersAction.fetchUsers.processing, (state) => ({ ...state, meta: HttpActionState.Busy })),
  on(UsersAction.fetchUsers.processed, (state, { users, total }) =>
    adapter.setAll(users, {
      ...state,
      selectedUserId: null,
      meta: HttpActionState.Done,
      pagination: { ...state.pagination, total, pages: Math.trunc(total / state.pagination.perPage) }
    })),
  on(UsersAction.fetchUsers.fail, (state, { error }) => ({ ...state, meta: { error } })),
  on(UsersAction.fetchUsers.cancel, state => {
    return { ...state, meta: state.meta === HttpActionState.Busy ? HttpActionState.Done : state.meta };
  }),
  on(UsersAction.fetchUsers.setPage, (state, { page }) => ({ ...state, pagination: { ...state.pagination, page } })),
  on(UsersAction.fetchUsers.sortByRole, (state, { role }) => ({ ...state, role, pagination: { ...state.pagination, page: 1 } })),
);
