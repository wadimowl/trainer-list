import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  APPROVE_STATE,
  DataToUpdateUser,
  LoginResponse,
  ROLES,
  Trainer,
  User,
  UserInResponse,
  UserList
} from './users.types';
import { PaginationRequest } from '../common.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppUserApiService {
  private baseUrl = `${environment.appServerApi}/user`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map(({ token }) => token),
      );
  }

  logout(): Observable<undefined> {
    return this.http.get<undefined>(`${this.baseUrl}/logout`);
  }

  getById(id: string): Observable<Trainer | User> {
    return this.http.get<UserInResponse>(`${this.baseUrl}/${id}`).pipe(map(this.unwrapAdditionalInfo));
  }

  updatePhoto(index: number, userId: string, status: APPROVE_STATE): Observable<void> {
    const body = {
      userId,
      status,
      imageIndex: index,
    };
    return this.http.put<void>(`${this.baseUrl}/photo`, body);
  }

  updateCertificate(index: number, userId: string, status: APPROVE_STATE): Observable<void> {
    const body = {
      userId,
      status,
      imageIndex: index,
    };
    return this.http.put<void>(`${this.baseUrl}/certificate`, body);
  }

  updateUser(data: DataToUpdateUser): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}`, data);
  }

  fetchUserToModerate(): Observable<Trainer> {
    return this.http.get<UserInResponse>(`${this.baseUrl}/unmoderate`).pipe(
      map(this.unwrapAdditionalInfo),
      delay(2000)
    );
  }

  list(pagination: PaginationRequest, role?: ROLES | null): Observable<UserList> {
    const body = { pagination, ...(role && { role }) };
    const convertDate = (list: UserList): UserList => {
      list.users = list.users.map((user: UserInResponse) => {
        if (user.createdAt) {
          user.createdAt = new Date(user.createdAt).toLocaleString();
        }
        return user;
      });
      return list;
    };
    return this.http.post<UserList>(`${this.baseUrl}/list`, body).pipe(map(convertDate));
  }

  private unwrapAdditionalInfo(user: UserInResponse): Trainer {
    const { additional, ...rest } = user;
    return { ...rest, ...additional };
  }
}
