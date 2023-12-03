import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { CurrentUserSessionFacade } from '@shared/store/current-user-session/current-user-session.facade';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  constructor(public currentUserFacade: CurrentUserSessionFacade, private dialog: MatDialog) {}

  login() {
    this.dialog.open(LoginComponent);
  }

  logout() {
    this.currentUserFacade.logout();
  }
}
