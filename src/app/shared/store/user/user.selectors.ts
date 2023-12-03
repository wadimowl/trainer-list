import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userKey, UserState } from './user.state';
import { ServerError } from '../../../services/main-api/server-errors/server-base.error';
import { NotFoundError } from '../../../services/main-api/server-errors/not-found.error';
import { HttpActionErrorProps, HttpActionState } from '../http-meta';

export namespace UserSelectors {
  const state = createFeatureSelector<UserState>(userKey);
  export const selectUser = createSelector(state, state => state.user);
  export const selectUserIsLoading = createSelector(state, state => state.meta === HttpActionState.Busy);
  export const selectUserIsLoaded = createSelector(state, state => state.meta === HttpActionState.Done);
  export const selectWhatPropertiesIsChanging = createSelector(state, state => state.whatPropertiesIsChanging);
  export const lackOfUsers = createSelector(state, state => {
    const error = (state.meta as HttpActionErrorProps)?.error;
    return ServerError.tryCastToServerErrorAndCompare(NotFoundError, error);
  });
}
