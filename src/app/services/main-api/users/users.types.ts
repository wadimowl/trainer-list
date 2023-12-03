import {Sort} from '@angular/material/sort';

type ValueOf<T> = T[keyof T];

export enum USER_STATUS {
  APPROVED = 0,
  PENDING,
  BLOCKED,
}

export enum APPROVE_STATE {
  PENDING = 0,
  ACCEPT = 1,
  DECLINE = 2,
}

export enum ROLES {
  ADMINISTRATOR = 'ADMINISTRATOR', // not in use yet
  TRAINER = 'TRAINER',
  CLIENT = 'CLIENT',
}

export interface Trainer extends User, AdditionalUserInfo {
  photos?: ProvableImage[];
  certificates?: ProvableImage[];
}

export interface User {
  certified: boolean;
  status: USER_STATUS;
  about?: string;
  _id: string;
  phone: string;
  createdAt?: string;
  avatar?: string;
  role: ROLES;
}

export interface UserInResponse extends User {
  photos?: ProvableImage[];
  certificates?: ProvableImage[];
  additional?: AdditionalUserInfo;
}

export interface ProvableImage {
  approved: APPROVE_STATE;
  url: string;
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface AdditionalUserInfo {
  gender?: GENDER;
  name?: string;
  location?: string;
  birthday?: number;
  email?: string;
}

export interface UserList {
  pagination: { page: number, total: number };
  sort: Sort;
  users: UserInResponse[];
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface UsersListRequestParams {
  role?: ROLES;
  sort?: Sort;
  withoutClub?: boolean;
}

export type DataToUpdateUser = {
  [key in keyof Trainer]: ValueOf<Trainer>;
} & {
  id: User['_id'];
};
