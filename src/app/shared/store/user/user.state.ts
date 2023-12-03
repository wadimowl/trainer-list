import { Trainer } from '../../../services/main-api/users/users.types';
import { HttpActionMetadata } from '../http-meta';

export const userKey = 'user';

export interface UserState {
  user: Trainer | null;
  whatPropertiesIsChanging: Set<keyof Trainer>;
  meta: HttpActionMetadata;
}
