import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UsersFacade } from "@shared/store/users/users.facade";

@Injectable()
export class FetchUsersGuard implements CanActivate {
  constructor(public usersFacade: UsersFacade) {}

  canActivate(): boolean {
    this.usersFacade.fetchUsers();
    return true
  }
}
