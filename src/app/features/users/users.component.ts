import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsersFacade } from "@shared/store/users/users.facade";
import { RoleSortOption } from "@shared/store/users/users.types";
import { MatDialog } from "@angular/material/dialog";
import { UserPortalComponent } from "./components/user-portal/user-portal.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  constructor(public usersFacade: UsersFacade, private dialog: MatDialog) { }

  paginationChange(event: PageEvent) {
    this.usersFacade.setPage(event.pageIndex + 1);
  }

  roleSortingChange(role: RoleSortOption) {
    this.usersFacade.roleSortingChange(role);
  }

  userSelect(userId: string) {
    this.dialog.open(UserPortalComponent, { data: userId });
  }
}
