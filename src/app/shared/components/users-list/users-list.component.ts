import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableAnimations } from '../../../animations/table.animations';
import { PageEvent } from '@angular/material/paginator';
import { ROLES, User } from '../../../services/main-api/users/users.types';
import { UsersParams } from '../../store/users/users.reducer';
import * as moment from 'moment/moment';
import { ALL_ROLE_SELECTOR, RoleSortOption } from '../../store/users/users.types';

const ROLES_SORT_TITLES = [ALL_ROLE_SELECTOR, ROLES.CLIENT, ROLES.TRAINER];

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: TableAnimations,
})
export class UsersListComponent {
  @Output() userSelect = new EventEmitter<string>();
  @Output() paginationChange = new EventEmitter<PageEvent>();
  @Output() roleChange = new EventEmitter<RoleSortOption>();

  @Input() set users(list: User[]) {
    this._users = list.map(value => ({
      ...value,
      createdAt: moment().format('MMM Do YY'),
      phone: value.phone.replace( /(\d{3})(\d{3})(\d{4})/, '$1-$2-$3' ),
    }));
  }
  get users(): User[] {
    return this._users;
  }

  @Input() set params(params: UsersParams) {
    this._params = params;
    const index = ROLES_SORT_TITLES.indexOf(params.role);
    if (index < 0) {
      throw 'Unexpected role in role title list';
    }
    this.roleIndex = index;
  }

  get params(): UsersParams {
    return this._params;
  }

  @Input() load = true;

  private _users: User[] = [];
  private _params!: UsersParams;

  readonly columns: string[] = ['phone', 'createdAt', 'role', 'name'];
  private roleIndex = 0;

  get selectedRole(): string | null {
    return ROLES_SORT_TITLES[this.roleIndex];
  }

  roleClick(): void {
    this.roleIndex = (this.roleIndex + 1) % ROLES_SORT_TITLES.length;
    this.roleChange.emit(ROLES_SORT_TITLES[this.roleIndex]);
  }
}
