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
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

describe('AddPersonComponent (templateUrl)', () => {
  let comp: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let personService: PersonService;
  let spy: jasmine.Spy;

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
    spy = spyOn(personService, 'addPerson').and.returnValue(Observable.of(true));
    //spy = spyOn(personService, 'addPerson').and.returnValue(Observable.of(true));
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

  it('person search data loaded', async(() => {

    personService.addPerson = jasmine.createSpy('').and.returnValue(true)
    let targetComponent = fixture.componentInstance;
    fixture.detectChanges();

    fixture.whenStable().then(() => {

      //expect(targetComponent.data.length).toBe(2);
      //expect(targetComponent.data[0].firstName).toBe('jeremy');
      //expect(targetComponent.data[0].lastName).toBe('woo');
    })
  }));
});
