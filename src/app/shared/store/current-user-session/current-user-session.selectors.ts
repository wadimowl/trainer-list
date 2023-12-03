import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as UserReducer from './current-user-session.reducer';
import { CurrentUserSessionState } from "./current-user-session.reducer";
import { HttpActionErrorProps, HttpActionState } from "@shared/store/http-meta";

export const selectUserState = createFeatureSelector<CurrentUserSessionState>(
  UserReducer.currentUserFeatureKey
);

export const selectUserEmail = createSelector(
  selectUserState, state => state.data?.email
);

export const selectUserError = createSelector(
  selectUserState, state => (state.meta as HttpActionErrorProps)?.error ?? null
);

export const selectUserProcessingStatus = createSelector(
  selectUserState, state => state.meta === HttpActionState.Busy
);

export const selectIsAuthorize = createSelector(
  selectUserState, state => !!state.data?.email
);

export const selectToken = createSelector(
  selectUserState, state => state.data?.token
);
