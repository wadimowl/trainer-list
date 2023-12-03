import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { selectIsAuthorize } from '@shared/store/current-user-session/current-user-session.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { ROUTES } from '../../core/app-routing.module';

@Injectable({ providedIn: 'root' })
export class UnAuthGuard implements CanActivate {
  constructor(private store: Store, public router: Router) {
  }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectIsAuthorize).pipe(
      take(1),
      map(isAuth => !isAuth || this.router.createUrlTree([ROUTES.DEFAULT])));
  }
}
