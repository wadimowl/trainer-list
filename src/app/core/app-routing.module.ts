import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guards/auth.guard';
import { NotAuthedComponent } from "./not-authed/not-authed.component";
import { UnAuthGuard } from "../services/guards/un-auth.guard";

export const ROUTES = {
  DEFAULT: '',
  USERS: 'users',
  USER_MODERATE: 'user-moderate',
  UN_AUTHORISE: 'un-authorise',
};
const routes: Routes = [
  {
    path: ROUTES.DEFAULT,
    pathMatch: 'full',
    redirectTo: ROUTES.USERS
  },
  {
    path: ROUTES.USERS,
    loadChildren: () => import('../features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: ROUTES.USER_MODERATE,
    loadChildren: () => import('../features/user-moderate/user-moderate.module').then(m => m.UserModerateModule),
    canActivate: [AuthGuard],
  },
  {
    path: ROUTES.UN_AUTHORISE,
    component: NotAuthedComponent,
    canActivate: [UnAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
