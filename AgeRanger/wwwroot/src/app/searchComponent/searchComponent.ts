import { first } from 'rxjs/operator/first';
import { PersonService } from '../services/PersonService';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { Person } from '../Person'

@Component({
  selector: 'my-app',
  templateUrl: `./searchComponent.html`
})

export class SearchComponent {

  private firstname = new FormControl();
  private lastname = new FormControl();
  private firstnameTerm: string = '';
  private lastnameTerm: string = '';
  private data: Person[] = [];

  constructor(private personService: PersonService) {
  }

  ngOnInit() {

    this.firstname.valueChanges
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(term => {
        this.firstnameTerm = term;
        this.personService.search(this.firstnameTerm, this.lastnameTerm).subscribe(searchData => {
          this.data = searchData;
        });
      });

    this.lastname.valueChanges
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(term => {
        this.lastnameTerm = term;
        this.personService.search(this.firstnameTerm, this.lastnameTerm).subscribe(searchData => {
          this.data = searchData;
        });;
      });
  }
}
