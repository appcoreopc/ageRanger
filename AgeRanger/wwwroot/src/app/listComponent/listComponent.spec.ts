import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListComponent } from './listComponent';
import { PersonService } from '../services/PersonService'
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

describe('ListComponent', () => {

  let fixture: ComponentFixture<ListComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let comp: ListComponent;
  let personService: PersonService;
  let spy: jasmine.Spy;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule, CommonModule
      ],
      declarations: [ListComponent], // declare the test component, 
      providers: [PersonService],
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    personService = TestBed.get(PersonService);
    spy = spyOn(personService, 'listPerson').and.returnValue(Observable.of(
      {
        firstName: 'jeremy', lastName: 'woo'
      }, {
        firstName: 'mark', lastName: 'lee'
      }
    ).toArray());
  });

  it('Person List component loaded', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css("h2"));
    el = de.nativeElement;
    expect(el.innerText).toContain('Person List');
  });

  it('Person List data loaded', async(() => {
    let targetComponent = fixture.componentInstance;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(targetComponent.data.length).toBe(2);
      expect(targetComponent.data[0].firstName).toBe('jeremy');
      expect(targetComponent.data[0].lastName).toBe('woo');
    })
  }));


});
