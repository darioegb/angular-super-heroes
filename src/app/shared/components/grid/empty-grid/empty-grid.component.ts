import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-empty-grid',
  template: `
    <tr class="mat-row">
      <td class="mat-cell" colspan="4">
        {{
          'globals.grid.noMatchingDataText'
            | translate: { value: input?.nativeElement?.value || '' }
        }}
      </td>
    </tr>
  `,
  styles: [],
})
export class EmptyGridComponent {
  @Input() input: ElementRef<unknown>;
}
