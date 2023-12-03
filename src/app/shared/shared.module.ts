import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IsAuthDirective } from './directives/is-auth/is-auth.directive';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SpinnerModule } from './components/spinner/spinner.module';
import { SpinnerWrapperComponent } from './directives/input-loader/spinner-wrapper/spinner-wrapper.component';

@NgModule({
  declarations: [IsAuthDirective, IsAuthDirective, UsersListComponent, SpinnerWrapperComponent],
  exports: [
    UsersListComponent,
    IsAuthDirective,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SpinnerModule
  ]
})
export class SharedModule { }
