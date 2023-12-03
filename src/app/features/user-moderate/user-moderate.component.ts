import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFacade } from '@shared/store/user/user.facade';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserChangeEvent } from '@shared/components/user-profile/user-profile.types';

@UntilDestroy()
@Component({
  selector: 'app-user-moderate',
  templateUrl: './user-moderate.component.html',
  styleUrls: ['./user-moderate.component.scss']
})
export class UserModerateComponent implements OnInit, OnDestroy {
  constructor(
    private snackBar: MatSnackBar,
    public userModerateFacade: UserFacade,
  ) {
  }
  ngOnInit(): void {
    this.userModerateFacade.sameUserRequested$.pipe(untilDestroyed(this), filter(Boolean)).subscribe(() => {
      this.snackBar.open(
        'Only this user is available for moderation',
        'Close'
      );
    });
  }

  ngOnDestroy(): void {
    this.userModerateFacade.cancelNextUserForModerationRequest();
  }

  changeUser(event: UserChangeEvent) {
    this.userModerateFacade.changeUser(event);
  }
}
