import { ObserveOnMessage } from 'rxjs/operator/observeOn';
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AddPersonComponent } from './addPersonComponent';
import { PersonService } from '../services/PersonService'
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../Person';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

describe('AddPersonComponent', () => {
  let comp: AddPersonComponent;
  let fixture: ComponentFixture<AddPersonComponent>;
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
      declarations: [AddPersonComponent], // declare the test component, 
      providers: [PersonService],
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonComponent);
    personService = fixture.debugElement.injector.get(PersonService);
    personService = TestBed.get(PersonService);

    spy = spyOn(personService, 'addPerson').and.returnValue(Observable.of(true));


  });

  it('submit button is rendered', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css("#submit"));
    expect(de.attributes["type"]).toContain('submit');
  });

  it('rendered controls - firstname, lastname and age', () => {

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css("#firstname")).attributes["id"]).toContain('firstname');
    expect(fixture.debugElement.query(By.css("#lastname")).attributes["id"]).toContain('lastname');
    expect(fixture.debugElement.query(By.css("#age")).attributes["id"]).toContain('age');
  });

  it('add person successful ', async(() => {

    let targetComponent = fixture.componentInstance;
    let fakePerson = new Person({
      firstName: '',
      lastName: '',
      age: 12
    });

    fixture.detectChanges();
    let submitResult = targetComponent.onSubmit(fakePerson);
    submitResult.subscribe(r => {
      fixture.whenStable().then(() => {
        console.log(r);
        expect(r).toBe(true);
      })
    });
  }));

});
