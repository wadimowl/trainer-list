import { createAction } from '@ngrx/store';

const scope = 'Custom route event';
export namespace RouterProcessingActions {
  export const loadingDataInRoute = createAction(`${scope} loading`);
  export const loadDataInRoute = createAction(`${scope} loaded`);
}
