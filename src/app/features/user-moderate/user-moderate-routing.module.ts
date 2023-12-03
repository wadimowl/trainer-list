import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModerateComponent } from './user-moderate.component';

const routes: Routes = [{ path: '', component: UserModerateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModerateRoutingModule { }
