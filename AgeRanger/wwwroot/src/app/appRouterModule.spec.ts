import {
    async, ComponentFixture, fakeAsync, TestBed, tick,
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';
import { SpinnerService } from './spinnerComponent/spinnerService';
import { click } from '../testing';
import { Person } from './Person';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import * as r from '@angular/router';
import { Router, RouterLinkWithHref } from '@angular/router';

import { By } from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { SearchComponent } from './searchComponent/searchComponent';
import { AddPersonComponent } from './addPersonComponent/addPersonComponent';
import { ListComponent } from './listComponent/listComponent';
import { PersonService } from './services/PersonService';
import { AppRoutingModule } from './appRouterModule';
import { SpinnerComponent } from './spinnerComponent/spinnerComponent';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page: Page;
let router: Router;
let location: SpyLocation;
let links: DebugElement[];

describe('Routing component', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppRoutingModule, RouterTestingModule],
            declarations: [AppComponent, SpinnerComponent],
            providers: [SpinnerService]
        }).compileComponents();
    }));

    it('default navigate location', fakeAsync(() => {
        createComponent();
        expect(location.path()).toEqual('/', 'default route');
    }));

    it('navigate to add', fakeAsync(() => {
        createComponent();
        click(page.addPersonLinkDe);
        advance();
        expectPathToBe('/add');
        expectElementOf(AddPersonComponent);
    }));

    it('navigate to list', fakeAsync(() => {
        createComponent();
        click(page.listPersonLinkDe);
        advance();
        expectPathToBe('/list');

    }));

    it('navigate to search', fakeAsync(() => {
        createComponent();
        click(page.searchLinkDe);
        advance();
        expectPathToBe('/search');

    }));

});


class Page {
    searchLinkDe: DebugElement;
    addPersonLinkDe: DebugElement;
    listPersonLinkDe: DebugElement;
    recordedEvents: any[] = [];

    // for debugging
    comp: AppComponent;
    location: SpyLocation;
    router: Router;
    fixture: ComponentFixture<AppComponent>;

    expectEvents(pairs: any[]) {
        const events = this.recordedEvents;
        expect(events.length).toEqual(pairs.length, 'actual/expected events length mismatch');
        for (let i = 0; i < events.length; ++i) {
            expect((<any>events[i].constructor).name).toBe(pairs[i][0].name, 'unexpected event name');
            expect((<any>events[i]).url).toBe(pairs[i][1], 'unexpected event url');
        }
    }

    constructor() {
        router.events.subscribe(e => this.recordedEvents.push(e));
        links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

        this.addPersonLinkDe = links[0];
        this.listPersonLinkDe = links[1];
        this.searchLinkDe = links[2];

        // for debugging
        this.comp = comp;
        this.fixture = fixture;
        this.router = router;
    }
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
    expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

function expectElementOf(type: Type<any>): any {
    const el = fixture.debugElement.query(By.directive(type));
    console.log(el);
    return el;
}

function advance(): void {
    tick();
    fixture.detectChanges();
}

const fakePersonData = () => [
    { id: 1, firstName: 'Jermaine', lastName: 'Nelson', age: 4, ageGroup: 'Child' },
    { id: 2, firstName: 'Phil', lastName: 'McCurdy', age: 20, ageGroup: 'Teenager' },
    { id: 3, firstName: 'Shannon', lastName: 'Alexander', age: 11, ageGroup: 'Child' },
    { id: 4, firstName: 'Duncan', lastName: 'Tim', age: 50, ageGroup: 'Kinda old' }
] as Person[];

function createComponent() {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    const injector = fixture.debugElement.injector;
    location = injector.get(Location) as SpyLocation;
    router = injector.get(Router);
    router.initialNavigation();

    spyOn(injector.get(PersonService), 'listPerson')
        .and.returnValue(Observable.of(fakePersonData())); // fakes it

    advance();

    page = new Page();
}

