import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './toolbar/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOwner from '@shared/store/current-user-session/current-user-session.reducer';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CurrentUserSessionEffects } from '@shared/store/current-user-session/current-user-session.effects';
import { NavigationComponent } from './navigation/navigation.component';
import { MatTabsModule } from '@angular/material/tabs';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import {
  routeProcessingFeatureKey,
  routerFeatureKey,
  routerProcessingReducer
} from '@shared/store/router-customize/router-processing.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TokenInterceptor } from '../services/interceptors/token.interceptor';
import { CurrentUserSessionFacade } from '@shared/store/current-user-session/current-user-session.facade';
import { RouterProcessingFacade } from '@shared/store/router-customize/router-processing.facade';
import { SpinnerModule } from '@shared/components/spinner/spinner.module';
import { UserFacade } from '@shared/store/user/user.facade';
import { NotAuthedComponent } from './not-authed/not-authed.component';
import { CustomSerializer } from "@shared/store/router-customize/router-serializer";
import { ControlErrorModule } from "@shared/components/control-error/control-error.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    NavigationComponent,
    NotAuthedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatDividerModule,
    MatMenuModule,
    MatDialogModule,
    SharedModule,
    ControlErrorModule,
    StoreModule.forRoot({
      [fromOwner.currentUserFeatureKey]: fromOwner.reducer,
      [routerFeatureKey]: routerReducer,
      [routeProcessingFeatureKey]: routerProcessingReducer,
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    EffectsModule.forRoot([CurrentUserSessionEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    MatTabsModule,
    MatProgressSpinnerModule,
    SpinnerModule,
  ],
  providers: [
    UserFacade,
    CurrentUserSessionFacade,
    RouterProcessingFacade,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
