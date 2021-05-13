import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable().pipe(delay(0));

  show() {
    this.isLoadingSubject.next(true);
  }
  hide() {
    this.isLoadingSubject.next(false);
  }
}
