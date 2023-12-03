import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { CurrentUserSessionFacade } from '@shared/store/current-user-session/current-user-session.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[appIsAuth]'
})
export class IsAuthDirective implements OnInit, OnDestroy {
  private condition = true;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private currentUserFacade: CurrentUserSessionFacade,
  ) {}

  ngOnInit() {
    this.currentUserFacade.selectIsAuthorize$.pipe(untilDestroyed(this)).subscribe(authorized => {
      if (authorized && this.condition || !authorized && !this.condition) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy() {}

  /** empty string give ability to use this directive without any value like '*appIsAuth' */
  @Input() set appIsAuth(condition: boolean | '') {
    this.condition = condition === '' ? true : condition;
  }
}
