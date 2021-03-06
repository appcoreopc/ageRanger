import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SearchComponent } from './searchComponent';
import { PersonService } from '../services/PersonService'
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Person } from '../Person';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

describe('Search Person Component', () => {
  let comp: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let personService: PersonService;
  let spy: jasmine.Spy;
  let personData: Person[];

  const fakePersonData = () => [
    { id: 1, firstName: 'Jermaine', lastName: 'Nelson', age: 4, ageGroup: 'Child' },
    { id: 2, firstName: 'Phil', lastName: 'McCurdy', age: 20, ageGroup: 'Teenager' },
    { id: 3, firstName: 'Shannon', lastName: 'Alexander', age: 11, ageGroup: 'Child' },
    { id: 4, firstName: 'Duncan', lastName: 'Tim', age: 50, ageGroup: 'Kinda old' }
  ] as Person[];

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule, ReactiveFormsModule, CommonModule, FormsModule
      ],
      declarations: [SearchComponent], // declare the test component, 
      providers: [PersonService],
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    personService = TestBed.get(PersonService);
    spy = spyOn(personService, 'search').and.returnValue(fakePersonData());
  });

  it('component loaded', () => {
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css("h2"));
    el = de.nativeElement;
    expect(el.innerHTML).toContain("Search Person List");
  });

  it('rendered controls - firstname and lastname', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("#firstname")).attributes["id"]).toContain('firstname');
    expect(fixture.debugElement.query(By.css("#lastname")).attributes["id"]).toContain('lastname');
  });
});
