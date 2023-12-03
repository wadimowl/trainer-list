import { ROLES, Trainer, USER_STATUS } from '../../../services/main-api/users/users.types';

export const EMPTY_PROFILE_USER: Trainer = {
  _id: '0',
  phone: 'loading...',
  role: ROLES.CLIENT,
  avatar: '',
  name: 'loading...',
  email: 'loading...',
  about: 'loading...',
  certified: false,
  status: USER_STATUS.PENDING,
  photos: undefined,
  certificates: undefined
};
