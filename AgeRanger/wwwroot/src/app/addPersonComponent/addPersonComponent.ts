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
  status: boolean;

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

    this.personForm.valueChanges
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

  onValueChanged(data?: any) {
    if (!this.personForm) { return; }
    const form = this.personForm;

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

  addPerson(): void {
    let p = new Person({
      firstName: '',
      lastName: "",
      age: 12
    });

    this.personService.addPerson(p);
  }

  onSubmit(person: Person) {
     return this.personService.addPerson(person).then(statusResult => this.status = statusResult);
  }

  onSubmit2(person: Person) {
     return this.personService.addPerson2(person);
  }
}

