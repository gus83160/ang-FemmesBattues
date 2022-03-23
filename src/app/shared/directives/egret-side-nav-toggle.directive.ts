import { Directive, Host, Self, Optional, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { MatSidenav } from '@angular/material/sidenav';


@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[EgretSideNavToggle]'
})
export class EgretSideNavToggleDirective implements OnInit, OnDestroy {
  isMobile!: boolean;
  screenSizeWatcher!: Subscription;
  constructor(
    private mediaObserver: MediaObserver,
    @Host() @Self() @Optional() public sideNav: MatSidenav
  ) {
  }

  ngOnInit() {
    this.initSideNav();
  }

  ngOnDestroy() {
    if(this.screenSizeWatcher != null) {
      this.screenSizeWatcher.unsubscribe()
    }
  }

  updateSidenav() {
    const self = this;
    setTimeout(() => {
      self.sideNav.opened = self.isMobile === false;
      self.sideNav.mode = self.isMobile === true ? 'over' : 'side';
    })
  }
  initSideNav() {
    this.isMobile = this.mediaObserver.isActive('xs') || this.mediaObserver.isActive('sm');
    // console.log(this.isMobile)
    this.updateSidenav();
    this.screenSizeWatcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
      this.updateSidenav();
    });
  }

}
