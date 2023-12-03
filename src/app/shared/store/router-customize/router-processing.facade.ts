import { selectRouteProcessingPath, selectRouteProcessingState } from './router-processing.selector';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { RouterProcessingActions } from './router-processing.actions';
import { combineLatest, Observable } from 'rxjs';
import { RouterProcessingState } from "@shared/store/router-customize/router-processing.reducer";
import { map } from 'rxjs/operators';

@Injectable()
export class RouterProcessingFacade {
  readonly selectRouteProcessingState$ = this.store.select(selectRouteProcessingState);
  readonly selectRouteProcessingPath$ = this.store.select(selectRouteProcessingPath);

  constructor(private store: Store) {
  }

  showRouteLoader(): void {
    this.store.dispatch(RouterProcessingActions.loadingDataInRoute());
  }

  hideRouteLoader(): void {
    this.store.dispatch(RouterProcessingActions.loadDataInRoute());
  }

  isPathProcessing(path: RouterProcessingState['path']): Observable<boolean> {
    return combineLatest([
      this.selectRouteProcessingPath$.pipe(map(value => path === value)),
      this.selectRouteProcessingState$
    ])
      .pipe(map(result => result.every(Boolean)));
  }
}
