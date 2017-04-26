import { Observable } from 'rxjs/Rx';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/PersonService';
import { Person } from '../Person';
import 'rxjs/Rx';

@Component({
  selector: 'my-app',
  templateUrl: './AddPersonComponent.html'
})

export class AddPersonComponent implements OnInit {

  private person: Person = new Person();
  private personForm: FormGroup;
  status: number = 0;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'age': ''
  };

  constructor(private personService: PersonService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {

    this.personForm = this.fb.group({
      'firstName': [this.person.firstName, [Validators.required]],
      'lastName': [this.person.lastName, [Validators.required]],
      'age': [this.person.age, [Validators.required]],
    });

    this.personForm.valueChanges.debounceTime(500)
      .subscribe(data => this.onValueChanged(data));
  }

  validationMessages = {
    'firstName': {
      'required': 'First Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'lastName': {
      'required': 'Last Name is required.',
    },
    'age': {
      'required': 'Age is required.'
    }
  };

  onValueChanged(data?: Person) {
    if (!this.personForm) { return; }

    const form = this.personForm;
    this.person.firstName = data.firstName;
    this.person.lastName = data.lastName;
    this.person.age = data.age;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    return this.personService.addPerson(this.person).subscribe(result => {
      if (result.status === 201) {
        this.status = 1;
        this.personForm.reset();
      }
      else
        this.status = -1;
    });
  }
}