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

describe('ListComponent', () => {
  
  let fixture: ComponentFixture<ListComponent>;
  let de: DebugElement;
  let el: HTMLElement;

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
  });

  it('Person List component loaded', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css("h2"));
    el = de.nativeElement;
    expect(el.innerText).toContain('Person List');
  });
  
});
