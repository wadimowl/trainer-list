import { Trainer } from '../../../services/main-api/users/users.types';
import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpActionErrorProps } from '../http-meta';
import {
  UserChangeEvent, UserDataChangeEvent, UserImageApproveEvent
} from '@shared/components/user-profile/user-profile.types';

export namespace UserActions {
  export const fetchUserForModeration = createAction('User fetch user for moderation');
  export const fetchUserById = createAction('User fetch user by id', props<{ id: string }>());

  export const fetchUser = createActionGroup({
    source: 'User fetch user',
    events: {
      'processed': props<{ user: Trainer }>(),
      'fail': props<HttpActionErrorProps>(),
      'cancel': emptyProps(),
      'clear': emptyProps(),
    },
  });

  export const changeUserProperty = createActionGroup({
    source: 'User change user',
    events: {
      'processing': props<UserDataChangeEvent>(),
      'Approve Processing': props<UserImageApproveEvent>(),
      'processed': props<Pick<UserChangeEvent, 'property'>>(),
      'fail': props<HttpActionErrorProps>(),
    },
  });
}
