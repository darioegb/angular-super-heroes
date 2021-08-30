import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable().pipe(delay(0));

  show(): void {
    this.isLoadingSubject.next(true);
  }
  hide(): void {
    this.isLoadingSubject.next(false);
  }
}
