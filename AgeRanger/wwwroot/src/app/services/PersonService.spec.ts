import {
    async, inject, TestBed
} from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {
    HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Person } from '../Person';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { PersonService } from './PersonService';

const fakePersonData = () => [
    { id: 1, firstName: 'Jermaine', lastName: 'Nelson', age: 4, ageGroup: 'Child' },
    { id: 2, firstName: 'Phil', lastName: 'McCurdy', age: 20, ageGroup: 'Teenager' },
    { id: 3, firstName: 'Shannon', lastName: 'Alexander', age: 11, ageGroup: 'Child' },
    { id: 4, firstName: 'Duncan', lastName: 'Tim', age: 50, ageGroup: 'Kinda old' }
] as Person[];

describe('Basic PersonService with (mockBackend)', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                PersonService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        }).compileComponents();
    }));


    it('can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
        }));

    it('instantiate service class', inject([PersonService], (service: PersonService) => {
        expect(service instanceof PersonService).toBe(true);
    }));
});

describe('PersonService List', () => {

    let backend: MockBackend;
    let service: PersonService;
    let personData: Person[];
    let response: Response;

    const fakePersonData = () => [
        { id: 1, firstName: 'Jermaine', lastName: 'Nelson', age: 4, ageGroup: 'Child' },
        { id: 2, firstName: 'Phil', lastName: 'McCurdy', age: 20, ageGroup: 'Teenager' },
        { id: 3, firstName: 'Shannon', lastName: 'Alexander', age: 11, ageGroup: 'Child' },
        { id: 4, firstName: 'Duncan', lastName: 'Tim', age: 50, ageGroup: 'Kinda old' }
    ] as Person[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                PersonService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        }).compileComponents();
    }));

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {

        backend = be;
        service = new PersonService(http);
        personData = fakePersonData();
        let options = new ResponseOptions({ status: 200, body: { data: personData } });
        response = new Response(options);

    }));

    it('listing ok', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        service.listPerson()
            .do(plist => {
                expect(plist.data.length).toBe(personData.length,
                    'should have expected no. of Person');
            })
            .toPromise();
    })));

    it('listing ok with no results', async(inject([], () => {
        let okResponse = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        service.listPerson().do(plist => {
            expect(plist.length).toBe(0, 'no person in list is ok too')
        })
    })));

    it('500 - error received', async(inject([], () => {
        let okResponse = new Response(new ResponseOptions({
            status: 500
        }));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        service.listPerson().do(plist => {
            fail('should be no person');
        }).catch(err => {
            return Observable.of(null);
        });
    })));
});

describe('PersonService Search', () => {

    let backend: MockBackend;
    let service: PersonService;
    let personData: Person[];
    let response: Response;

    const fakePersonData = () => [
        { id: 1, firstName: 'Jermaine', lastName: 'Nelson', age: 4, ageGroup: 'Child' },
        { id: 2, firstName: 'Phil', lastName: 'McCurdy', age: 20, ageGroup: 'Teenager' },
        { id: 3, firstName: 'Shannon', lastName: 'Alexander', age: 11, ageGroup: 'Child' },
        { id: 4, firstName: 'Duncan', lastName: 'Tim', age: 50, ageGroup: 'Kinda old' }
    ] as Person[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                PersonService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        }).compileComponents();
    }));

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new PersonService(http);
        personData = fakePersonData();
        let options = new ResponseOptions({ status: 200, body: { data: personData } });
        response = new Response(options);
    }));

    it('firstname, lastname null search', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        service.search(null, null)
            .do(plist => {
                expect(plist.data.length).toBe(personData.length, 'should have expected no. of Person');
            })
            .toPromise();
    })));
});

describe('PersonService Add', () => {

    let backend: MockBackend;
    let service: PersonService;
    let personData: Person[];
    let response: Response;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                PersonService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        }).compileComponents();
    }));

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {

        backend = be;
        service = new PersonService(http);
        let options = new ResponseOptions({ status: 201, body: {} });
        response = new Response(options);

    }));

    it('person add ok response', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
        service.addPerson(new Person({ firstName: 'john', lastName: 'doe' }))
            .do(result => {
                expect(result.status).toBe(201);
                expect(result.ok).toBe(true);
            })
            .toPromise();
    })));
});
