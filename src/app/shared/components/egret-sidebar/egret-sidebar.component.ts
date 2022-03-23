import {
  Component,
  OnInit,
  Input,
  HostBinding,
  OnDestroy,
  HostListener,
  Directive,
  Renderer2,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {EgretSidebarHelperService} from './egret-sidebar-helper.service';
import {MatchMediaService} from '../../services/match-media.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'egret-sidebar',
  templateUrl: './egret-sidebar.component.html',
  styleUrls: ['./egret-sidebar.component.scss']
})
export class EgretSidebarComponent implements OnInit, OnDestroy {
  // Name
  @Input()
  name: string | undefined;

  // right
  @Input()
  @HostBinding('class.position-right')
  right: boolean | undefined;

  // Open
  @HostBinding('class.open')
  opened: boolean | undefined;

  @HostBinding('class.sidebar-locked-open')
  sidebarLockedOpen: boolean | undefined;

  // mode
  @HostBinding('class.is-over')
  isOver: boolean | undefined;

  private backdrop: HTMLElement | null = null;

  private lockedBreakpoint = 'gt-sm';
  private unsubscribeAll: Subject<any>;

  constructor(
    private matchMediaService: MatchMediaService,
    private mediaObserver: MediaObserver,
    private sidebarHelperService: EgretSidebarHelperService,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.sidebarHelperService.setSidebar(this.name, this);

    if (this.mediaObserver.isActive(this.lockedBreakpoint)) {
      this.sidebarLockedOpen = true;
      this.opened = true;
    } else {
      this.sidebarLockedOpen = false;
      this.opened = false;
    }

    this.matchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        // console.log("medua sub");
        if (this.mediaObserver.isActive(this.lockedBreakpoint)) {
          this.sidebarLockedOpen = true;
          this.opened = true;
        } else {
          this.sidebarLockedOpen = false;
          this.opened = false;
        }
      });
  }

  open() {
    this.opened = true;
    if (this.sidebarLockedOpen === false && this.backdrop !== null) {
      this.showBackdrop();
    }
  }

  close() {
    this.opened = false;
    this.hideBackdrop();
  }

  toggle() {
    if (this.opened === true) {
      this.close();
    } else {
      this.open();
    }
  }

  showBackdrop() {
    this.backdrop = this._renderer.createElement('div');
    if (this.backdrop !== null) {
      this.backdrop.classList.add('egret-sidebar-overlay');

      this._renderer.appendChild(
        this._elementRef.nativeElement.parentElement,
        this.backdrop
      );

      // Close sidebar onclick
      this.backdrop.addEventListener('click', () => {
        this.close();
      });

      this.cdr.markForCheck();
    }
  }

  hideBackdrop() {
    this.backdrop?.parentNode?.removeChild(this.backdrop);
    this.backdrop = null;

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.sidebarHelperService.removeSidebar(this.name);
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[egretSidebarToggler]'
})
export class EgretSidebarTogglerDirective {
  @Input('egretSidebarToggler')
  public id: any;

  constructor(private egretSidebarHelperService: EgretSidebarHelperService) {
  }

  @HostListener('click')
  onClick() {
    this.egretSidebarHelperService.getSidebar(this.id).toggle();
  }
}
