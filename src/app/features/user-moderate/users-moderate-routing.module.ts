import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModerateComponent } from './user-moderate.component';
import { FetchUserForModerationResolver } from './resolvers/fetch-user-for-moderation.resolver';
import { DropUserOnLeavingGuard } from "./guards/drop-user-on-leaving.guard";

const routes: Routes = [
  {
    path: '',
    component: UserModerateComponent,
    resolve: {
      init: FetchUserForModerationResolver
    },
    canDeactivate: [DropUserOnLeavingGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersModerateRoutingModule {
}
