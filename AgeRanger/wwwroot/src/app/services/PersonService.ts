import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Person } from '../Person';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { URLSearchParams } from './SearchParameterUrl';
//import 'rxjs';

@Injectable()
export class PersonService {

    private _http: Http;
    private _dataList: any;
    private _dataSearch: any;
    private _localhost: string = "http://localhost:80";
    private _urlPersonAdd: string = this._localhost + "/api/person/addPerson";
    private _urlPersonList: string = this._localhost + "/api/person/list";
    private _urlPersonSearch: string = this._localhost + "/api/person/search";

    isLoading: boolean = false;

    constructor(private http: Http) {
    }

    addPerson(person: Person): Promise<boolean> {
        return new Promise(resolve => {
            return resolve(false);
        });
    };

    addPerson2(person: Person): Observable<any> {
        return this._http.post(this._urlPersonAdd, JSON.stringify(person)).map(data => data.json());
    };

    listPerson(): Observable<any> {
        return this._http.get(this._urlPersonList).map(data => data.json());
    };

    search(firstname: string, lastname: string, age: string) {
        var searchUrlParser = new URLSearchParams();
        var searchUrl =
            searchUrlParser.getSearchParameter(firstname, lastname);

        return new Promise(resolve => {
            this._http.get(this._urlPersonSearch + searchUrl).map(x => x.json()).subscribe(y => {
                this._dataSearch = y;
                resolve(this._dataSearch);
            });
        });
    }
}