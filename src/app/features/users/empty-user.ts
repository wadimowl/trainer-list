import { GENDER, Trainer, ROLES, USER_STATUS } from '../../services/main-api/users/users.types';

export const EMPTY_USER: Trainer = {
  _id: '',
  certified: false,
  phone: '',
  status: USER_STATUS.PENDING,
  avatar: '',
  about: '',
  role: ROLES.TRAINER,
  photos: [],
  certificates: [],
  gender: GENDER.MALE,
  name: '',
  birthday: Date.now(),
  email: '',
};
