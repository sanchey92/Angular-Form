import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {

    this.form = new FormGroup({

      email: new FormControl('', [
        Validators.email,
        Validators.required,
        MyValidators.restrictedEmail
      ], MyValidators.unicEmail),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),

      address: new FormGroup({
        country: new FormControl('ru'),
        city: new FormControl('', Validators.required)
      }),

      skills: new FormArray([])
    })
    ;
  }

  submit(): void {
    const formData = {...this.form.value};
    console.log(formData);
    this.form.reset();
  }

  setCapital(): void {
    const cityMap = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск'
    };
    const cityKey = this.form.get('address').get('country').value;
    const city = cityMap[cityKey];

    this.form.patchValue({
      address: {city}
    });
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    (this.form.get('skills') as FormArray).push(control);
  }
}

