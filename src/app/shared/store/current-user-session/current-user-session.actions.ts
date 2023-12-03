import { createAction, createActionGroup, props } from '@ngrx/store';
import { HttpActionErrorProps } from '@shared/store/http-meta';

export const currentUserLoginActions = createActionGroup({
  source: 'Current user session login',
  events: {
    'processing': props<{ login: string; password: string }>(),
    'processed': props<{ email: string; token: string }>(),
    'fail': props<HttpActionErrorProps>(),
  },
});

export const logoutAction = createAction(`Current user session Logout`);
