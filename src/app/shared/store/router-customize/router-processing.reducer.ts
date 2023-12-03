import { createReducer, on } from '@ngrx/store';
import { routerCancelAction, routerErrorAction, routerNavigatedAction, routerNavigationAction } from '@ngrx/router-store';
import { RouteModeEnum } from './route-mode.enum';
import { RouterProcessingActions } from './router-processing.actions';

export const routeProcessingFeatureKey = 'router-processing';
export const routerFeatureKey = 'router';
export interface RouterProcessingState {
  mode: RouteModeEnum;
  path: string;
}
export const initialState = { mode: RouteModeEnum.INIT, path: '' };

export const routerProcessingReducer = createReducer(
  initialState,
  on(routerNavigationAction, (_, payload) => {
    return ({ mode: RouteModeEnum.MOUNTING, path: payload.payload.event.urlAfterRedirects });
  }),
  on(routerNavigatedAction, routerCancelAction, routerErrorAction, (state) => {
    return state.mode === RouteModeEnum.MOUNTING ? { ...state, mode: RouteModeEnum.DONE } : state;
  }),
  on(RouterProcessingActions.loadingDataInRoute, state => ({ ...state, mode: RouteModeEnum.LOADING })),
  on(RouterProcessingActions.loadDataInRoute, state => ({ ...state, mode: RouteModeEnum.DONE })),
);

