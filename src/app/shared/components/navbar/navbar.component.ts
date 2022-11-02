import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, merge, fromEvent, map } from 'rxjs';

import { LOCALES } from '@shared/globals';
import { Option } from '@shared/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  langOptions: Option[];
  selectedLang: string;
  networkStatus: boolean = false;

  private unsubscribe$: Subscription = Subscription.EMPTY;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.checkNetworkStatus();
    this.langOptions = LOCALES.map((value) => ({
      key: `globals.locales.${value}`,
      value,
    }));
    this.selectedLang =
      localStorage.getItem('lang') || this.translate.defaultLang;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  changeLanguaje(): void {
    this.translate.use(this.selectedLang);
    localStorage.setItem('lang', this.selectedLang);
  }

  checkNetworkStatus(): void {
    this.networkStatus = navigator.onLine;
    this.unsubscribe$ = merge(
      fromEvent(window, 'online'),
      fromEvent(window, 'offline'),
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => (this.networkStatus = status));
  }
}
