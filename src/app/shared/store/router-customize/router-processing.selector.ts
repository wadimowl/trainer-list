import { createFeatureSelector, createSelector } from '@ngrx/store';
import { routeProcessingFeatureKey, RouterProcessingState } from './router-processing.reducer';
import { RouteModeEnum } from './route-mode.enum';

export const selectRouteProcessing = createFeatureSelector<RouterProcessingState>(
  routeProcessingFeatureKey
);

export const selectRouteProcessingState = createSelector(
  selectRouteProcessing, state => state.mode === RouteModeEnum.LOADING || state.mode === RouteModeEnum.MOUNTING);

export const selectRouteProcessingPath = createSelector(
  selectRouteProcessing, state => state.path);
