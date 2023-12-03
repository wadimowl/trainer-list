import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { userKey } from './user.state';
import { UserFacade } from './user.facade';

@NgModule({
  providers: [UserFacade],
  imports: [StoreModule.forFeature(userKey, userReducer), EffectsModule.forFeature([UserEffects])],
})
export class UserStoreModule {}
