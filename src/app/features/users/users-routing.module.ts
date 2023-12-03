import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { StopUsersFetchingOnLeaveGuard } from "./guards/stop-users-fetching-on-leave.guard";
import { FetchUsersGuard } from "./guards/fetch-users.guard";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [FetchUsersGuard],
    canDeactivate: [StopUsersFetchingOnLeaveGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [StopUsersFetchingOnLeaveGuard, FetchUsersGuard],
})
export class UsersRoutingModule { }
