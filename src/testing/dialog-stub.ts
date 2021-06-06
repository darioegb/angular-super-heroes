import { of } from 'rxjs';

export class DialogStub {
  readonly instance = {
    afterClosed: () => of(true),
  };

  open() {
    return this.instance;
  }

  setInstance(dialog: boolean) {
    this.instance.afterClosed = () => of(dialog);
  }
}
