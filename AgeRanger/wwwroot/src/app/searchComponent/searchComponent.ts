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

  private firstname = new FormControl();
  private lastname = new FormControl();

  private firstnameTerm: string = '';
  private lastnameTerm: string = '';

  constructor(private personService: PersonService) {
  }

  ngOnInit() {

    this.firstname.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {
        this.firstname = term;
        this.personService.search(this.firstnameTerm, this.lastnameTerm);

      });

    this.lastname.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {
        this.lastname = term;
        this.personService.search(this.firstnameTerm, this.lastnameTerm);

      });
  }
}
