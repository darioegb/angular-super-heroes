import { Observable, of } from 'rxjs';

interface DialogInstance {
  afterClosed: Function;
}

export class DialogStub {
  readonly instance: DialogInstance = {
    afterClosed: (): Observable<boolean> => of(true),
  };

  open(): DialogInstance {
    return this.instance;
  }

  setInstance(dialog: boolean): void {
    this.instance.afterClosed = (): Observable<boolean> => of(dialog);
  }
}
