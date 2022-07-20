import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Option } from '@shared/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  langOptions: Option[] = [
    {
      key: 'English',
      value: 'en',
    },
    {
      key: 'Español',
      value: 'es',
    },
  ];
  selectedLang: string;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    this.selectedLang = lang ? lang : this.translate.defaultLang;
    this.translate.use(this.selectedLang);
  }

  changeLanguaje(): void {
    this.translate.use(this.selectedLang);
    localStorage.setItem('lang', this.selectedLang);
  }
}
