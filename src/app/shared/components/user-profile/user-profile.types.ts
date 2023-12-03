// phone, role, name, email, about, status. photos, certificates, avatar

import { APPROVE_STATE, Trainer } from '../../../services/main-api/users/users.types';

interface UserChangeBase {
  property: keyof Trainer;
}

export interface UserDataChangeEvent extends UserChangeBase {
  value: Trainer[UserChangeBase['property']];
}

export interface UserImageApproveEvent extends UserChangeBase {
  property: 'photos' | 'certificates';
  value: { id: number, status: APPROVE_STATE };
}

export type UserChangeEvent = UserDataChangeEvent | UserImageApproveEvent;

export function isUserImageChangeEvent(event: UserDataChangeEvent | UserImageApproveEvent): event is UserImageApproveEvent {
  const { value } = event;
  return !!value && typeof value === 'object' && 'id' in value && 'status' in value;
}

export enum VISUAL_CONTENT {
  PHOTO = 'photos',
  CERTIFICATES = 'certificates',
}
