import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { SpinnerWrapperComponent } from '@shared/directives/input-loader/spinner-wrapper/spinner-wrapper.component';

@Directive({ selector: '[appInputLoader]' })
export class InputLoaderDirective implements OnInit {

  private componentRef?: ComponentRef<SpinnerWrapperComponent>;
  private loading?: boolean;

  constructor(
    private container: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  public ngOnInit(): void {
    if (this.componentRef) {
      return;
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(SpinnerWrapperComponent);
    this.componentRef = this.container.createComponent<SpinnerWrapperComponent>(factory);
    this.onChange();
  }

  set isLoad(flag: boolean) {
    if (flag === this.loading || !this.componentRef) {
      return;
    }
    this.loading = flag;
    this.onChange();
  }

  @Input() set appInputLoader(flag: boolean | null) {
    this.isLoad = !!flag;
  }

  private onChange() {
    if (!this.componentRef) {
      return;
    }
    if (this.loading) {
      this.container.insert(this.componentRef.hostView);
      return;
    }
    this.container.detach();
  }
}
