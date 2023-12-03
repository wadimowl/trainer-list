import { createReducer, on } from '@ngrx/store';
import * as UserActions from './current-user-session.actions';
import { currentUserLoginActions } from './current-user-session.actions';
import { HttpActionMetadata, HttpActionState } from '@shared/store/http-meta';

export const currentUserFeatureKey = 'current-user-session';

export interface CurrentUserSessionState {
  meta: HttpActionMetadata;
  data: { email: string; token: string; } | null;
}

export const initialState: CurrentUserSessionState = Object.freeze({
  data: null,
  meta: HttpActionState.Init,
});

export const reducer = createReducer(
  initialState,
  on(currentUserLoginActions.processing, (state) => ({ ...state, meta: HttpActionState.Busy })),
  on(currentUserLoginActions.processed, (state, { email, token }) =>
    ({ ...state, meta: HttpActionState.Done, data: { email, token } })),
  on(currentUserLoginActions.fail, (state, { error }) =>
    ({ ...state, meta: { error } })),
  on(UserActions.logoutAction, () => initialState),
);
