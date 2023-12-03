import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { UsersFacade } from "@shared/store/users/users.facade";

@Injectable()
export class StopUsersFetchingOnLeaveGuard implements CanDeactivate<boolean> {
  constructor(public usersFacade: UsersFacade) {}

  canDeactivate(): boolean {
    this.usersFacade.cancelUsersFetching();
    return true
  }
}
