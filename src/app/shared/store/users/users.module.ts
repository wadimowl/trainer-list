import { UsersFacade } from "./users.facade";
import { reducer, usersFeatureKey } from "./users.reducer";
import { UsersEffects } from "./users.effects";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";

@NgModule({
  providers: [UsersFacade],
  imports: [StoreModule.forFeature(usersFeatureKey, reducer), EffectsModule.forFeature([UsersEffects])],
})
export class UsersStoreModule {}
