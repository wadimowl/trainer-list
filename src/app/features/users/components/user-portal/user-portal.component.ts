import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UserFacade } from '@shared/store/user/user.facade';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { UserChangeEvent } from '@shared/components/user-profile/user-profile.types';

@UntilDestroy()
@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPortalComponent implements OnInit, OnDestroy {
  constructor(public userFacade: UserFacade, @Inject(MAT_DIALOG_DATA) private id: string) {
  }

  ngOnInit(): void {
    this.userFacade.fetchUserById(this.id);
  }

  ngOnDestroy(): void {
    this.userFacade.dropUser();
  }

  changeUser(event: UserChangeEvent) {
    this.userFacade.changeUser(event);
  }
}
