import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { TokenExpireError } from '../main-api/server-errors/token-expire.error';
import { AuthorizationError } from '../main-api/server-errors/authorization.error';
import { TokenNotExistError } from '../main-api/server-errors/token-not-exist.error';
import { ServerError } from '../main-api/server-errors/server-base.error';
import { CurrentUserSessionFacade } from "@shared/store/current-user-session/current-user-session.facade";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private currentUserSessionFacade: CurrentUserSessionFacade) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.currentUserSessionFacade.selectToken$.pipe(
      take(1),
      switchMap(token => {
        if (!token) {
          return next.handle(request);
        }

        request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        return next.handle(request).pipe(
          catchError((errorResponse: HttpErrorResponse) => {
            const errors = [TokenExpireError, AuthorizationError, TokenNotExistError];
            /** logout user if token expire, wrong or authorize error occurs */
            if (errors.some(localError => ServerError.tryCastToServerErrorAndCompare(localError, errorResponse.error))) {
              this.currentUserSessionFacade.logout();
            }
            return throwError(errorResponse);
          })
        );
      })
    )
  }
}
