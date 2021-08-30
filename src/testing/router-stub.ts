import { Navigation } from '@angular/router';

export class RouterStub {
  readonly extras = {
    state: null,
  };

  getCurrentNavigation(): Partial<Navigation> {
    return { extras: this.extras };
  }

  setState(state: { [k: string]: unknown }): void {
    this.extras.state = state;
  }
}
