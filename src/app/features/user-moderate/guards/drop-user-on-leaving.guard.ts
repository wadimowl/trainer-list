import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { UserFacade } from "@shared/store/user/user.facade";

@Injectable()
export class DropUserOnLeavingGuard implements CanDeactivate<boolean> {
  constructor(public userFacade: UserFacade) {}

  canDeactivate(): boolean {
    this.userFacade.dropUser();
    return true
  }
}
