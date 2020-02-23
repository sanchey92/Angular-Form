import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export interface IValid {
  [key: string]: boolean;
}

export class MyValidators {

  static restrictedEmail(control: FormControl): IValid {
    if (['one@mail.ru', 'two@mail.ru'].includes(control.value)) {
      return {restrictedEmail: true};
    }
    return null;
  }

  static unicEmail(control: FormControl): Promise<IValid> | Observable<IValid> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'async@mail.ru') {
          resolve({unicEmail: true});
        } else {
          resolve(null);
        }
      }, 3000);
    });
  }

}
