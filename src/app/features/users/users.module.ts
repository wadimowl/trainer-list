import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '@shared/shared.module';
import { UsersStoreModule } from "@shared/store/users/users.module";
import { UserPortalComponent } from './components/user-portal/user-portal.component';
import { UserProfileModule } from "@shared/components/user-profile/user-profile.module";
import { UserStoreModule } from "@shared/store/user/user.module";

@NgModule({
  declarations: [
    UsersComponent,
    UserPortalComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    UsersStoreModule,
    SharedModule,
    UserStoreModule,
    UserProfileModule
  ]
})
export class UsersModule { }
