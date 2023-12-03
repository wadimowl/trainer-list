import { User } from '../../../services/main-api/users/users.types';
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { HttpActionErrorProps } from '@shared/store/http-meta';
import { RoleSortOption } from './users.types';

export namespace UsersAction {
  export const fetchUsers = createActionGroup({
    source: 'Users list',
    events: {
      'sort by role': props<{ role: RoleSortOption }>(),
      'set page': props<{ page: number }>(),
      'processing': emptyProps(),
      'processed': props<{ users: User[], total: number }>(),
      'fail': props<HttpActionErrorProps>(),
      'cancel': emptyProps(),
    },
  });
}
