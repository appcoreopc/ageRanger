import { first } from 'rxjs/operator/first';
import { PersonService } from '../services/PersonService';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'my-app',
  templateUrl: `./searchComponent.html`
})

export class SearchComponent {

  firstname = new FormControl();
  lastname = new FormControl();

  constructor(private personService: PersonService) {
  }

  ngOnInit() {

    this.firstname.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {
        console.log(this.firstname.value);
      });

    this.lastname.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {
        console.log(this.lastname.value);
      });
  }
}
