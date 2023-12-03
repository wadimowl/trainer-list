import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterProcessingFacade } from '@shared/store/router-customize/router-processing.facade';
import { Observable } from 'rxjs';

type Link = { route: string, title: string };
type LinkWithProcessingIndicator = Link & { processing$: Observable<boolean> };

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  linkList: LinkWithProcessingIndicator[] = [];

  @Input() set links(data: Link[]) {
    this.linkList = data.map(item => {
      const route = `/${item.route}`;
      const processing$ = this.routerProcessingFacade.isPathProcessing(route);
      return { ...item, route, processing$ };
    });
  };

  constructor(private routerProcessingFacade: RouterProcessingFacade) {}
}
