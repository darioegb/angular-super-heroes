import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { FilterInput } from '@shared/models';
import {
  Subject,
  fromEvent,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-grid-filter',
  templateUrl: './grid-filter.component.html',
  styleUrls: ['./grid-filter.component.scss'],
})
export class GridFilterComponent implements AfterViewInit, OnDestroy {
  @Input() filterInput: FilterInput;
  @Output() filterChange = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;
  private unsubscribe$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.onKeyUp();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onReset(): void {
    this.input.nativeElement.value = '';
    this.filterChange.emit('');
  }

  private onKeyUp(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map(({ target: { value } }) => value),
        filter(({ length }) => length > 2 || length === 0),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((value) => {
        this.filterChange.emit(value);
      });
  }
}
