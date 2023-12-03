import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileModule } from '@shared/components/user-profile/user-profile.module';
import { UserModerateComponent } from './user-moderate.component';
import { UsersModerateRoutingModule } from './users-moderate-routing.module';
import { UserStoreModule } from '@shared/store/user/user.module';
import { FetchUserForModerationResolver } from './resolvers/fetch-user-for-moderation.resolver';
import { DropUserOnLeavingGuard } from "./guards/drop-user-on-leaving.guard";

@NgModule({
  declarations: [UserModerateComponent],
  imports: [
    CommonModule,
    UsersModerateRoutingModule,
    FlexLayoutModule,
    UserProfileModule,
    MatButtonModule,
    UserStoreModule,
  ],
  providers: [FetchUserForModerationResolver, DropUserOnLeavingGuard]
})
export class UserModerateModule { }
