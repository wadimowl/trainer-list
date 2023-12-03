import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserFacade } from '@shared/store/user/user.facade';

@Injectable()
export class FetchUserForModerationResolver implements Resolve<boolean> {
  constructor(private userModerateFacade: UserFacade) {
  }
  resolve(): boolean {
    this.userModerateFacade.dropUser();
    this.userModerateFacade.requestNextUserForModeration();
    return true;
  }
}
