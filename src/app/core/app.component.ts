import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTES } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly routeData = [
    { route: ROUTES.USERS, title: 'Users' },
    { route: ROUTES.USER_MODERATE, title: 'User moderate' },
  ];
}
